/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	username: {
  		type: Sequelize.STRING
    },
    postContent: {
  		type: Sequelize.STRING
  	},
    responsesCount: {
      type: Sequelize.INTEGER
    }    
  },
  associations: function () {
  	Post.hasMany(Response, {as: 'responses', foreignKey: 'postId'});
  },
  options: {
    freezeTableName: false,
    tableName: 'post',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

