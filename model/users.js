module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      //defineed model
      name: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("name", value + " shaik");
        },
        get() {
          return this.getDataValue("name") + " xyz";
        },
      },
      email: {
        type: DataTypes.STRING,
        // set(value) {
        //   this.setDataValue("email", value + "@gmail.com");
        // },
        allowNull: "false",
        unique: true,
      },
      gender: {
        type: DataTypes.STRING,
        // validate:{equals:'male'}, only allows male.
        // validate: { isIn: [["male", "female", "others"]] },  //only allows these three
        // validate:{equals:{args:"male",msg:"please enter only male."}}  //to set condition and send massage from here itself.
        validate:{isIn:{arg:[["male", "female", "others"]],msg:`please enter from given options `}}
      },
    },
    {
      // timeStamps:false //to remove createdAt and updatedAt from table.
      // updatedAt:false  //to remove updatedAt from table
      // createdAt:false  //to remove createdAt from table
      // createAt:'created_at',
      // engine:"MYISAM"
      //tableName:'userdata', //to change the table name
    }
  );
  return Users;
};
