const mongoose = require('mongoose');

const schema = mongoose.Schema( {
	id: mongoose.Schema.Types.ObjectId,
	title: {
		type: String,
		required: true,
		minlength: 1,
	},
	body: {
		type: String,
		required: true,
		minlength: 1,
	},
	updated_at: Date,
	created_at: Date,
}, {
	versionKey: false
}
);

const Article = mongoose.model('Article', schema);

async function createArticle(userData) {
	try {
		return await Article.create(userData);
	} catch (error) {
		return error
	}
}

module.exports = { createArticle };
