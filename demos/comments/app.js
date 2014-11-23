// Based on React's tutorial: 
// http://facebook.github.io/react/docs/tutorial.html

var Espresso = window.Espresso;
var Collection = Espresso.Collection;
var Controller = Espresso.Controller;
var List = Espresso.List;

var Comment = Controller.extend({
	removeComment: function(e) {
		console.log('removing', this.model.id);
		comments.remove({ id: this.model.id });
		return false;
	},
	render: function() {
		return {
			author: { text: this.model.author },
			text: { html: this.model.text },
			remove: { onclick: this.removeComment }
		};
	}
});

var CommentForm = Controller.extend({
	saveComment: function(e) {
		// prevent default
		e.preventDefault();
		var comment = {
			author: this.ref.author.value,
			text: this.ref.text.value,
			id: comments.count()
		};
		comments.push(comment);
		e.target.reset();
		console.log('added', comment);
	},
	render: function() {
		return {
			// the `view` is itself
			view: { onsubmit: this.saveComment }
		};
	}
});

var CommentBox = Controller.extend({
	init: function() {
		this.form = new CommentForm();
		this.list = new List(Comment, comments);
	},
	render: function() {
		return {
			form: this.form,
			list: this.list
		};
	}
});

var comments = new Collection([
  { id: 1, author: '@vla (Vlad Yazhbin)', text: 'This is one comment' },
  { id: 2, author: 'AngularJS', text: 'This is *another* comment' }
]);

var app = new CommentBox({
	view: document.querySelector('.commentBox')
});
// shown once app init
app.view.style.display = 'block';
