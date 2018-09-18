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
	new: function(req, res) {
		Post.create({  
			username: req.body.username,
			postTitle: req.body.postTitle,
			postContent: req.body.postContent
		}).then(post => {		
			res.redirect('post');
		}).catch(function(err) {
			res.json(err);
		});
	},
	get: function(req, res) {
		Post.findById(req.params.id, {
			include: [
				{model: Response, as: 'responses'}
			]
		}).then(post => {
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

			Response.destroy({ where: { postId: id } })
				.then(Post.destroy({ where: { id: id } }))
				.then(() => {
					return res.redirect('/post');
				})
				.catch(function(err) {
					res.json(err);
				});
			});
	}
};

