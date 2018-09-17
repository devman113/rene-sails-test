/**
* Response.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	username: {
  		type: Sequelize.STRING
    },
    responseContent: {
  		type: Sequelize.STRING
  	}  	
  },
  associations: function () {
	Response.belongsTo(Post, {foreignKey: 'postId'});
  },
  options: {
    freezeTableName: false,
    tableName: 'response',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

