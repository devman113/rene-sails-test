/**
 * ResponseController
 *
 * @description :: Server-side logic for managing responses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		Response.findAll({
			include: [
				{model: Post}
			]
		}).then(function(responses) {
			res.json(responses);
		}).catch(function(err) {
			res.json(err);
		});
	}
};

