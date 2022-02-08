const { Sequelize, Op, QueryTypes } = require("sequelize");
const db = require("../model/index");
const { addPost } = require("./posts");
const Users = db.users;
const Posts = db.posts;
const Tags = db.tags;

exports.addUser = async (req, res) => {
  let data = await Users.create({ name: "Test1", email: "test1@gmail.com" });

  console.log(data);

  /* to update data.
    data.name='Awaiz'; 
    data.gender='male';
    data.save();
    */

  /* to delete data.
     data.destroy();
    */

  /*reload it will leave changed value and take previouse value only.
     data.name='dummy';
     data.reload()
     */

  let response = { data: "ok" };
  res.status(200).json(response);
};

exports.crudOperation = async (req, res) => {
  /* insert

    let data = await Users.create({name:'demo1',email:'demo1@gm.com',gender:'male'});
    console.log(data.id);
    */

  /* update
    
    let data = await Users.update({name:'finaldemo',email:'finaldemo@gm.com'},{
        where:{  //where id is 3 it will update.
            id:6
        }
    })

    */

  /* delete

    let data = await Users.destroy({where:{id:3}});  //deletes the id:3 item.
    
    */

  /* truncate  //deletes all the data inside the table but not the table.

    let data = await Users.destroy({truncate:true});
    
    */

  /** bulkCreate //to insert bulk data
     * 
     let data =await Users.bulkCreate([
         {name:'1',email:'1@gm.com',gender:'m'},
         {name:'2',email:'2@gm.com',gender:'m'},
         {name:'3',email:'3@gm.com',gender:'r'},
         {name:'4',email:'4@gm.com',gender:'m'},
         {name:'5',email:'5@gm.com',gender:'r'},
         {name:'6',email:'6@gm.com',gender:'f'},
         {name:'7',email:'7@gm.com',gender:'m'},
         {name:'8',email:'8@gm.com',gender:'f'},
         {name:'9',email:'9@gm.com',gender:'m'}
     ]);
     
     */

  /** find
      let data = await Users.findAll({}); //to find all
      let data=await Users.findOne({where:{id:4}});
       
      */

  let response = {
    data: data,
  };

  res.status(200).json(response);
};

exports.queryData = async (req, res) => {
  //insert with conditions
  /* let data = await Users.create(
    { name: "demo1", email: "demo1@gm.com", gender: "male" },
    { fields: ["email"] } //only allows email attribute and other(name & gender) attributes will be Null.
    { fields: ["email","name"] } //only allows email & name attribute and other(gender) attributes will be Null.
  ); */

  //select
  /* let data = await Users.findAll({
    attributes: 
            ["name", //what attributes you wanna keep and other(id,gender,createdAt,updatedAt)attributes wont be found/shown.
            // ["email","emailId"],  // to change attributeName email as emailId 
            'gender',
            [Sequelize.fn('Count',Sequelize.col('email')),'emailCount'] //to use functions(like Count,CONCAT ...etc) we use Sequelize.fn(),  {"data":[{"name":"1","gender":"m","emailCount":11}]} 
            // [Sequelize.fn('CONCAT',Sequelize.col('email'),` ID`),'emailCount'] //to use functions(like Count,CONCAT ...etc) we use Sequelize.fn(), { "name": "2","gender": "m","emailCount": "2@gm.com ID"},
        ], 
  }); */

  //include - exclude
  /*  let data = await Users.findAll({
    attributes:{
      exclude:["createdAt","updatedAt"],
      include:[[Sequelize.fn('CONCAT',Sequelize.col('name')," Singh"),'fullname']]
    }
  }) */

  //condition
  // refer this for operators
  //https://sequelize.org/master/manual/model-querying-basics.html#operators

  /* let data = await Users.findAll({
    where: {
      // id:1
      // id: { [Op.gt]: 2 }, //can use operators like &,or,like,equalto
      // email: { [Op.like]:'1@gm.com' }
    },
    order: [  //can set data order by.
      ["name", "DESC"], //here as descending order
      ["email",'DESC']
    ],
    group:['name'],
    limit:2,  //it will show only 2 records
    offset:1,  //
  }); */

  let response = {
    data: data,
  };

  res.status(200).json(response);
};

// find related functions(findByPk,findOne,findAll,findAndCountAll,findOrcreate)

exports.finderData = async (req, res) => {
  // let data = await Users.findAll(); //to find all
  // let data = await Users.findOne(); //to find one
  // let data = await Users.findByPk(3); //to find by primary key or id
  /* let data = await Users.findAndCountAll({
    where:{
      email:'test1@gmail.com'
    }
  }); */ //it finds data and adds a extra attribute count which gives no.of times term repeated.

  let [data, created] = await Users.findOrCreate({
    where: { name: 1 },
    defaults: { email: "awz@gmail.com", gender: "Male" },
  }); //it will find and if it doesn't exist it will create.

  let response = { data: data, add: created };
  res.status(200).json(response);
};

exports.setterGetter = async (req, res) => {
  // let data = await Users.create({name:' Awaiz',email:'done',gender:'male'})

  let data = await Users.findAll();
  let response = {
    data: data,
  };

  res.status(200).json(response);
};

exports.ValidationCont = async (req, res) => {
  try {
    let data = await Users.create({
      name: "Test",
      email: "done@gmail.com",
      gender: "male",
    });
  } catch (e) {
    const messages = {};

    e.errors.forEach((error) => {
      let message;
      console.log(error);
      switch (error.validatorKey) {
        case "not_unique":
          message = "Duplicate Email";
          break;

        case "isIn":
          message = "Gender is wrong.";
      }
      messages[error.path] = message;
      console.log(messages);
    });
  }

  let response = {
    data: "me",
  };

  res.status(200).json(response);
};

exports.rawQuery = async (req, res) => {
  const users = await db.sequelize.query(
    "Select * from users where gender = $gender ",
    {
      type: QueryTypes.SELECT,
      // model: Users  //you can show models here
      // mapToModel:true
      // raw:true
      // replacements:{gender:"male"}  //gender=:gender
      // replacements:['male']  //gender=?
      // replacements:{gender:['male','female']}   //gender IN(:gender)
      //
      // replacements:{searchEmail:"%@gmail.com"}  // email LIKE :searchEmail
      bind: { gender: "male" },
    }
  );

  let response = { data: "Raw Query", record: users };
  res.status(200).json(response);
};

exports.oneToOne = async (req, res) => {
  let data = await Users.findAll({
    where: { id: 1 },

    //  include: Posts ,   //to get all attributes from posts
    //  include:[{model:Posts,attributes:['title','name']}] // to get some attributes from posts
    //  attributes:['name','email'], //shows only name and email from user
    include: [
      {
        model: Posts,
        as: "PostDetails",
        attributes: ["title", ["name", "PostName"]],
      },
    ], //to change post name
  });

  let response = { data: data };
  res.status(200).json(response);
};

exports.belongsTo = async (req, res) => {
  let data = await Posts.findAll({
    include: [
      {
        model: Users,
      },
    ],
  });

  let response = { data: data };
  res.status(200).json(response);
};

exports.oneToMany = async (req, res) => {
  let data = await Users.findAll({
    where: { id: 8 },
    attributes:['name','email'],
    include: [
      {
        model: Posts,
        as: "PostDetails",
        attributes: ["title", ["name", "PostName"]], //rename
      },
    ], //to change post name
  });

  let response = { data: data };
  res.status(200).json(response);
};

exports.manyToMany = async(req,res)=>{
  let data = await Posts.findAll({
    include:[{model:Tags}]
  });
  res.status(200).json(data);
}

exports.Scopes = async(req,res)=>{
  let data =  await Posts.scope('checkStatus').findAll({});
  res.status(200).json(data);
}

exports.loading = async(req,res)=>{
  //Lazy loading......
  // let data = await Users.findOne({
  //   where:{id:8}
  // })
  // let postData = await data.addPost();
  // let response={
  //   users:data,
  //   posts:postData
  // }

  











  
  
  //----eager loading...------
  
  let data = await Users.findOne({
    require:true,  //for joins
    include:[{
      model:Posts,
    }],
    where:{
      id:8
    }
  });
  
  res.status(200).json(response);
  
  let response={
    users:data,
    posts:postData
  },
  
  // res.status(200).json(response);
}