module.exports = (sequelize,DataTypes)=>{
    const Students = sequelize.define("Students",{
        Firstname :{
            type:DataTypes.STRING,
            //primaryKey: true,
            allowNull:false
        },
        Lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        DateofBirth:{
            type:DataTypes.STRING,
            allowNull:false

        },
        Class:{
            type:DataTypes.INTEGER,
            allowNull:false

        },
    });
    
    return Students;
}