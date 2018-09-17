/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		Post.findAll({
		}).then(function(posts) {
			return res.view('post/list', {
				posts: posts
			});
		}).catch(function(err) {
			res.json(err);
		});
	},
	get: function(req, res) {
		Post.findOne({
			include: [
				{model: Response, as: 'responses'}
			],
			id: req.params.id
		}).then(function(post) {
			return res.view('post/show', {
				post: post
			});
		}).catch(function(err) {
			res.json(err);
		});
	}
};

