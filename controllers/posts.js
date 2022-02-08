
const db = require("../model/index");
const Posts = db.posts;

exports.addPost=async(req,res)=>{
    let data = await Posts.create({name:"post1",title:"post",content:"post content",user_id:1});

    let response = { data: data };
  res.status(200).json(response);
}