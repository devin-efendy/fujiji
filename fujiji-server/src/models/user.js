// TODO: The following is only an example of how we
// can setup a Sequelize model from an existing table.
// I still can't make it work with our table.

// const { Model } = require('sequelize');

// module.exports = (sequelize, Sequelize) => {
//     class User extends Model {
//         static associate() {
//             // define association here
//         }
//     }

//     User.init(
//         {
//             user_id: {
//                 type: Sequelize.BIGINT,
//                 primaryKey: true,
//                 autoIncrement: true,
//                 allowNull: false
//             },
//             name: {
//                 type: Sequelize.STRING(100),
//                 allowNull: false
//             },
//             email_address: {
//                 type: Sequelize.STRING(100),
//                 allowNull: false
//             },
//             phone_number: {
//                 type: Sequelize.STRING(30),
//                 allowNull: false
//             },
//             password: {
//                 type: Sequelize.STRING(100),
//                 allowNull: false
//             }
//         },
//         {
//             sequelize,
//             modelName: 'User',
//             tableName: 'fujiji_user',
//             createdAt: false,
//             updatedAt: false,
//             underscore: true,
//         },
//     );

//     return User;
// };
