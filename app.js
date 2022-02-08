const express = require("express");
const app = express();
require('./model/index');
const userController=require('./controllers/userController');
const postController=require('./controllers/posts');
const tagController=require('./controllers/tags');

const PORT=8080;

app.get('/',(req,res)=>{
    res.send("Home Page");
});

app.get('/add',userController.addUser);
app.get('/crud',userController.crudOperation);
app.get('/query',userController.queryData);
app.get('/finder',userController.finderData);
app.get('/setter-getter',userController.setterGetter);
app.get('/validation',userController.ValidationCont);
app.get('/rawquery',userController.rawQuery);
app.get("/oneToOne",userController.oneToOne);
app.get("/posts",postController.addPost);
app.get("/tags",tagController.addTag);

app.get("/belongsTo",userController.belongsTo); 

app.get("/oneToMany",userController.oneToMany); 
app.get("/manyToMany",userController.manyToMany); 
app.get("/scopes",userController.Scopes); 
app.get("/loading",userController.loading);




// app.listen(PORT,()=>{
//     console.log(`Listening to local Host ${PORT}`);
// })
// app.listen(PORT,()=>{
//     console.log(`Listening to local Host ${PORT}`);
// })
// app.listen(PORT,()=>{
//     console.log(`Listening to local Host ${PORT}`);
// })
app.listen(PORT,()=>{
    console.log(`Listening to local Host ${PORT}`);
})