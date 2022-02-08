//connection to db

const {Sequelize,DataTypes} = require("sequelize")

// Database Connection
const sequelize = new Sequelize('nodesql','root','Awz@mysql043',{
    host:"localhost",
    dialect:'mysql',
    index:true, //to see sql (Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `email` VARCHAR(255) DEFAULT 'test@gmail.com', `gender` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;)
    
    
});

sequelize.authenticate()  //to check if conncetion is done or not.
.then(()=>{console.log('DB connected')})
.catch(err=>{console.error(`error occured ${err}`)});

const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.sequelize.sync({force:false}) // if force:true{it will drop table if exists and creates again}
// force:true,match:/nodesql$/   , if you are testing and want to create table everytime you start then use this.
.then(()=>{console.log("Yes resynced")})

db.users = require('./users')(sequelize,DataTypes);
db.posts=require("./posts")(sequelize,DataTypes);
db.tags=require("./tags")(sequelize,DataTypes);
db.posttags = require('./posttags')(sequelize,DataTypes);


//Scopes
db.users.addScope('checkStatus',{
    where:{status:1}
})


// ------------One - One------------- //

//changes post to PostDetails
// db.users.hasOne(db.posts,{foreignKey:'user_id',as:'PostDetails'}); //default is useId and here we told it to take user_id.

// ----------------One - Many-------------------- //
// db.users.hasMany(db.posts,{foreignKey:'user_id',as:'PostDetails'}); 
// db.posts.belongsTo(db.users.scope('checkstatus'),{foreignKey:'user_id'});
                          //we are using scope here to get the users whose status is 1.

// ------------------many - many ---------- //
db.posts.belongsToMany(db.tags,{through:'posttags'}); // belongs to many through posttags table(to include 3rd table)
db.tags.belongsToMany(db.posts,{through:'posttags'});


// polymorphic one - many
db.image.hasMany(db.comment,{  //a image can have many comments
    foreignkey:'commentId',
    constraints:false,
    scope:{   //to set bydefault condition
        commentType:"String"  //the type of the comment should be string.
    }
})
/*

//to see on this comment which video or image is there
db.comment.belongsTo(db.image,{foreignkey:'commentId',constraints:false});
db.comment.belongsTo(db.video,{foreignkey:'commentId',constraints:false});

*/

//-----------polymorphic many-many
/*
image can have multiple tags
video can have multiple tags
tag contains how many videos and images.

//image - tag
db.image.belongsToMany(db.tags,{
    through:{
        model:db.tagable,
        unique:false,
        scope:{
            tagType:"image"
        }
    },
    foreignKey:'tagableId',
    constaints:false
});

//tag - image
db.tags.belongsToMany(db.image,{
    through:{
        model:db.tagable,
        unique:false,
        scope:{
            tagType:"image"
        }
    },
    foreignKey:'tagableId',
    constaints:false
})

//video - tag.........
//tag - video.........

*/


module.exports=db;