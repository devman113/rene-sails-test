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
	},
	delete: function(req, res) {
		var id = req.params.id;
		if (!id) return res.send("No id specified.", 500);

		Post.findById(id).then(post => {
			if (!post) return res.send("No post with that idid exists.", 404);

			Post.destroy({ where: { id: id } }).then(() => {
				return res.redirect('/post');
			}).catch(function(err) {
				res.json(err);
			});
			
		}).catch(function(err) {
			res.json(err);
		});
	}
};

