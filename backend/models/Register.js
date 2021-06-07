module.exports = (sequelize,DataTypes)=>{
    const Register = sequelize.define("Register",{

        Username:{
            type:DataTypes.STRING,
            allowNull:false
        },
       Password:{
            type:DataTypes.STRING,
            allowNull:false
        }

    });

    return Register;
}