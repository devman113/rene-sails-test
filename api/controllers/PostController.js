/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		Post.findAll().then(function(posts) {
			return res.view('post/list', {
				posts: posts
			});
		}).catch(function(err) {
			res.json(err);
		});
	},
	all: function(req, res) {
		Post.findAll().then(function(posts) {
			res.send(posts);
		}).catch(function(err) {
			res.json(err);
		});
	},
	new: function(req, res) {
		var Q = require("q");
		var creator =  Q.async(function* () {
			var post = yield Post.create({  
				username: req.body.username,
				postTitle: req.body.postTitle,
				postContent: req.body.postContent
			});
			return post;
		});
		creator().then(post => {		
			console.log('A new post has been created.', post);
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

