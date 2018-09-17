/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		Post.findAll({
			include: [
				{model: Response, as: 'responses'}
			]
		}).then(function(posts) {
			res.json(posts);
		}).catch(function(err) {
			res.json(err);
		});
	}
};

