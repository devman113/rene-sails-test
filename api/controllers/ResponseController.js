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
	},
	new: function(req, res) {
		Response.create({  
			postId: req.body.postId,
			username: req.body.username,
			responseContent: req.body.responseContent
		}).then(response => {		
			res.redirect('back');
		}).catch(function(err) {
			res.json(err);
		});
	},
	delete: function(req, res) {
		var id = req.params.id;
		if (!id) return res.send("No id specified.", 500);

		Response.findById(id).then(response => {
			if (!response) return res.send("No response with that id exists.", 404);

			Post.findById(response.postId).then(post => {
				Post.update( 
					{ responsesCount: post.responsesCount > 1 ? post.responsesCount - 1 : 0 }, 
					{ where: {id: response.postId} })
						.then(Response.destroy({ where: { id: id } }))
						.then(() => {
							return res.redirect('back');
						});
			});
		}).catch(function(err) {
			res.json(err);
		});
	}
};

