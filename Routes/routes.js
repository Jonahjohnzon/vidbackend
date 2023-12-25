const router = require('express').Router()
const verifyJwt = require('../Verification/verify.js')
const verifyJwtad =  require('../VerificationAd/verifyad.js')
const {getMovies, pushMovie, findMovies, listMovies, getMoviescate, postComment, userData, loginIn, getUser , pushUsers, changePass , notify , loginInAd, Searchmovie,  editMovie, pushSeries, deletemovie, deleteComment, deleteoneComment , upcomingPush, latest, findMovie , check, Search} = require('../Controller/controller')

router.get('/get', getMovies)
router.get('/getcate', getMoviescate)
router.post('/postMovie',verifyJwtad, pushMovie)
router.get('/getMovies/:id', findMovies)
router.get('/getMovie/:id', findMovie)
router.get('/check/:id',verifyJwtad, check)
router.get('/listMovies/:category', listMovies)
router.put('/postComment/:id',verifyJwt, postComment)
router.post('/userData', userData)
router.post('/loginIn', loginIn)
router.post('/loginInAd', loginInAd)
router.get('/getUser/:id', getUser)
router.get('/latest', latest)
router.put('/pushUsers/:id',verifyJwt,pushUsers )
router.put("/changePass/:id",verifyJwt, changePass)
router.get("/notify/:id",verifyJwt, notify)
router.get('/Searchmovie/:searchmov',verifyJwtad, Searchmovie)
router.get('/Search/:search', Search)
router.put('/editMovie/:id',verifyJwtad, editMovie);
router.put('/pushSeries/:id',verifyJwtad, pushSeries);
router.delete("/deletemovie/:id",verifyJwtad, deletemovie)
router.delete("/deleteComment/:id",verifyJwt, deleteComment)
router.delete("/deleteoneComment/:id",verifyJwt, deleteoneComment)
router.post("/upcomingPush",verifyJwtad, upcomingPush)
router.get("/emailverify/:token" ,verifyemailtoken)
module.exports = router