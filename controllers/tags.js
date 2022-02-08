const { sequelize } = require("../model/index");
const db = require("../model/index");
const Tags = db.tags;

exports.addTag=async(req,res)=>{
    let data = await Tags.create({name:"tag3",tagid:3});

    let response = { data: data };
  res.status(200).json(response);
}

// module.exports = (sequelize,DataTypes)=>{
//   const Tags = sequelize.define('tags',{
//     name:DataTypes.STRING,
//   })
//   return Tags;
// }