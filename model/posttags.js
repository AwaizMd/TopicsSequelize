module.exports=(sequelize,DataTypes)=>{
    const Tags=sequelize.define("tags",{
        name:DataTypes.STRING,
        tagid:DataTypes.INTEGER,
        postid:DataTypes.INTEGER
    },{
        createdAt:'create_at',
        updatedAt:'modified_at',
    });
    return Tags;
}