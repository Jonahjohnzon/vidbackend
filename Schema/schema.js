const mongoose = require('mongoose')


const notification = mongoose.Schema({
    message:{
        type:String
    },
    data:{
        type:Date
    , default: Date.now},
    active:{
        type:Boolean
    }

})
const video = mongoose.Schema({
    title:{
        type:String
    },
    link:{
        type:String
    },
    category:{
        type:String
    },
    message:{
        type:String
    },
    reaction:{
        type:Number
    }
})

const follow = mongoose.Schema({
    name:{
        type:String
    },
    user_id:{
        type:String},
    profile:{
        type:String
    }
})

const user = mongoose.Schema({
    user_name:{
        type:String
    },
    email:{
        type:String
    }
    ,
    admin:{
        type:Boolean
    },
    password:{
        type:String
    },
    group_access:{
        type:Boolean
    },
    profile_image:{
        type:String
    },
    rank:{
        type:Number
    },
    notification:{
        notify:[notification],
        alarm:{
            type:Boolean
        }},
    suspend:{
        type:Boolean
    },
    ban:{
        type:Boolean
    },
    followers:[follow],
    followings:[follow],
    videos:[video]
})

const groupcomment = mongoose.Schema({
    name:{
        type:String
    },
    user_id:{
        type:String
    },
    chat:{
        type:String
    },
    profile_image:{
        type:String
    }
    ,
    data:{
        type:Date
    , default: Date.now},
    reaction:{
        type:Number
    },
    title:{
        type:Boolean
    },
    link:{
        type:String
    },
    titles:{
        type:String
    },
    wordings:{
        type:String
    },
    rank:{
        type:Number
    },
    star:{
        type:Number
    }

})

const groups = mongoose.Schema({
    title:{
        type:String
    },
    subtitle:{
        type:String
    },
    owner:{
        type:String
    },
    comment:[groupcomment],
    profile:{
        type:String
    }
})

const type = mongoose.Schema({
    a:{type:String},
    b:{type:String},
    c:{type:String}
})

const comment = mongoose.Schema({
    chat:{
        type:String
    },
    name:{
        type:String
    },
    id_user:{
        type:String
    },
      profile_image:{
        type:String
    },
    reaction:{
        type:Number
    },
    data:{
        type:Date
    , default: Date.now}
})

const episode = mongoose.Schema({
        no:{
            type:Number
        },
        link:{
            type:String
        }
})

const season_no = mongoose.Schema({
        number:{
            type:Number
        },
        episode:[episode]
})


const movies = mongoose.Schema({
        title:{
            type:String
        },
        rating:{
            type:String
        },
        year:{
            type:String
        },
        type:type,
        runtime:{
            type:String
        },
        rated:{
            type:String
        },
        release:{
            type:String
        },
        image:{
            type:String
        },
        overview:{
            type:String
        },
        comment:[comment],
        top:{
            type:Boolean
        },
        download:{
            type:String
        },
        trailer:{
            type:String
        },
        category:{
            type:String
        },
        data:{
            type:Date
        , default: Date.now},
        series:{
            type:Boolean
        },
        seasons:[season_no]
})

const upcoming = mongoose.Schema({
    title:{
        type:String
    },
    image:{
        type:String
    },
    src:{
        type:String
    }
})

module.exports.movies = mongoose.model('movies', movies)
module.exports.upcoming = mongoose.model('upcoming', upcoming)
module.exports.user = mongoose.model('user', user)
module.exports.groups = mongoose.model('groups', groups)