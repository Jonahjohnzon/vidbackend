const { groups, user, movies, upcoming } = require("../Schema/schema");
const JWT = require('jsonwebtoken') 
const bcrypt = require('bcrypt')

const getGames = async(req,res)=>{
    try{
    const data = await movies.find({})
    
        res.json(data)
    }
    catch(err){
        res.json(err)
    }
}
const getMoviescate = async(req,res)=>{
    try{
    const datah = await movies.find({category:"hollywood",series:false})
    const hollywood = datah.slice(0, 6)
    const datab= await movies.find({category:"bollywood",series:false})
    const bollywood = datab.slice(0, 6)
    const datan = await movies.find({category:"nollywood",series:false})
    const nollywood = datan.slice(0, 6)
    const kseries = await movies.find({category:"kseries",series:true})
    const datak = kseries.slice(0, 5)
    const anime = await movies.find({category:"anime",series:true})
    const dataa = anime.slice(0, 3)
    const datatop = await movies.find({top:true})
    const top = datatop.slice(0,3)
     

        res.json({hollywood,bollywood,nollywood,top,datak, dataa})
    }
    catch(err){
        res.json(err)
    }
}

const userData = async(req, res)=>{
    const pass = req.body.password
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(pass, salt)
    const email = req.body.email.toUpperCase()
    const useraccount = await user.find({email:email})
    if(req.body.password !== req.body.comfirmpassword)
    {
        return res.json({create:false, message:"Password Does not Match"})
    }
    if(useraccount.length > 0)
    {
        return res.json({create:false,message:"Email Already Exist"})
    }
    try{    
    const data = await user.create({
            user_name:req.body.user_name,
            rank:1,
            email:email,
            admin:false,
            password:hash,
            group_access:true,
            profile_image:"1",
            notification:{
                notify:{
                    message:"🌟 Welcome to the community! Dive into discussions, share your passion, and make yourself at home. Enjoy your stay! 🚀",
                    active:true
                },
                alarm:true},
            suspend:false,
            ban:false,
            followers:[],
            followings:[],
            videos:[]
        })
         await data.save()
         console.log("yes")
         res.json({create:true, message:"Account Create"})
    }
        catch(e)
        {
            console.log(e)
            res.json({create:false})
        }
    
}

const loginIn = async(req, res) =>{
    const emailinfo = req.body.email.toUpperCase()
    const info = await user.findOne({email:emailinfo})
    if(info == null){
        return res.json({auth:false,message:"Email Not Found"})
    }
    const result = await bcrypt.compare(req.body.password, info.password)
    if (result)
    {
        const id = info._id
        const token = JWT.sign({id}, process.env.JWTS)
        const userdata = {user_name:info.user_name, _id:info._id, admin:info.admin, group_access:info.group_access, profile_image:info.profile_image, rank:info.rank, notification:info.notification, suspend:info.suspend, ban:info.ban}
        res.json({auth:true, token:token, data:userdata})
    }
    else{
        return res.json({auth:false, message:'Password Wrong'})
    }

    
}

const deleteMovies = async (req, res) => {
   
    try{ 
    await movies.deleteMany({})
        res.json("done")
    }
    catch(e){
        res.json(e)
    }
}

const pushGames = async (req, res) => {
    try{
    const post = await movies.create({
        title:req.body.title,
        rating:req.body.rating,
        year:req.body.year,
        type:req.body.type,
        runtime:req.body.runtime,
        rated:req.body.rated,
        release:req.body.release,
        image:req.body.image,
        overview:req.body.overview,
        comment:[],
        download:req.body.download,
        trailer:req.body.trailer,
        category:req.body.category,
        top:req.body.top,
        series:req.body.series,
        seasons:req.body.seasons
    })
    await post.save()
   
        res.json('successful')
    }
    catch(e)
    {
        res.json(e)
    }
}
const createGroup = async (req, res) =>{
    try{
    const group  = await groups.create({
        title:req.body.title,
        subtitle:req.body.subtitle,
        owner:req.body.owner,
        comments:[],
        profile:req.body.profile})
    await group.save()
    
        res.json('successful')
    }
    catch(e)
    {
        res.json(e)
    }
}

const pushgroupcomment = async (req, res) =>{
   
    try{ 
    const id = req.params.id
    let link = ""
    let titles = ""
    let wordings =""
    if(req.body.comment.title){
        link = req.body.comment.link
        titles = req.body.comment.titles
        wordings = req.body.comment.wordings
    }
      const data = await groups.findByIdAndUpdate({_id:id},{
        $push:{
            "comment":{
                "name":req.body.comment.name,
                "user_id":req.body.comment.user_id,
                "chat":req.body.comment.chat,
                "profile_image":req.body.comment.profile_image,
                "reaction":req.body.comment.reaction,
                "title":req.body.comment.title,
                "link":link,
                "titles":titles,
                "wordings":wordings,
                "rank":req.body.comment.rank,
                "star": req.body.comment.star
            }
        }
    },{ new: true })
   
        res.json(data)
    }
    catch(e)
    {
        console.log(e)
    }

}

const getGroup = async(req,res)=>{
    try{
    const data = await groups.find({})
        res.json(data)
    }
    catch(err){
        res.json(err)
    }
}
const getGroupSlice = async(req,res)=>{
    try{
    const start = req.query.start
    const limit = req.query.limit
    const id = req.params.id
    const data = await groups.findOne({_id:id})
    const datas = await groups.find({})
    const newdata = datas.reverse().slice(0, 5)
    const info = data.comment.slice(start, limit)
    const total = {
        comments:info,
        title: data.title,
        subtitle:data.subtitle,
        owner: data.owner,
        _id:data._id,
        profile:data.profile,
        newdata:newdata
    }
    res.json(total)
    }
    catch(err){
        res.json(err)
    }
}
const findGames = async (req, res) =>{
    try{
    const id = req.params.id
    const data = await movies.findOne({_id:id})
        res.json(data)
    }
    catch(e)
    {
        res.json(e)
    }

}

const listGames = async (req, res) =>{
    const id = req.params.category.toUpperCase()
    const limit = req.query.limit
    const start = req.query.start
    if (id != "MOVIES" && id != "KSERIES" && id != "ANIME")
    {
        try{
        const data = await movies.find({
        $or: [
          {"type.a": id},
          {"type.b": id},
          {"type.c": id}
        ]
      })
    
        const length = data.length
        const info = data.slice(start, limit)
        res.json({info:info,length:length})
    }catch(e){
        res.json(e)
    }}
    else if(id == "MOVIES"){
        try{
        const data = await movies.find({
          })
         
            const length = data.length
            const info = data.slice(start, limit)
            res.json({info:info,length:length})
        }catch(e){
            res.json(e)
        }
    }
    else if(id == "KSERIES")
    {
        try{
        const data = await movies.find({category:"kseries",series:true})
       
          const length = data.length
          const info = data.slice(start, limit)
          res.json({info:info,length:length})
      }catch(e){
          res.json(e)
      }
    }
    else{
        try{
        const data = await movies.find({category:"anime",series:true})
          const length = data.length
          const info = data.slice(start, limit)
          res.json({info:info,length:length})
      }catch(e){
          res.json(e)
      }
    }
}

const pushSeason = async(req,res) =>{
    try{
    const id = req.params.id
    const data = await movies.updateOne({_id:id},{
        $push:{
            "seasons":[
                {
                 "number":req.body.number,
                "episode":req.body.episode
            }]
        }
    })
        res.json(data)
    }
    catch(e)
    {
        console.log(e)
    }
}

const postComment = async(req, res) =>{
    try{
    const comments = req.body.comment
    const id = req.params.id
    const result = await movies.updateOne({_id:id},{
        $push:{
            "comment":{
                chat:comments.chat,
                name:comments.name,
                id_user:comments.id_user,
                profile_image:comments.profile_image,
                reaction:comments.reaction
            }
        }
    })
        res.json(result)
    }
    catch(e)
    {
        console.log(e)
    }

}

module.exports = {getGames, pushGames, findGames, listGames, getMoviescate, postComment, deleteMovies, pushSeason, createGroup, pushgroupcomment ,getGroup, userData, loginIn, getGroupSlice }