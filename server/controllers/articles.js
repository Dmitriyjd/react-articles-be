const Article = require('../models/article');

async function createArticle(req,res){
  if(!req.body.title){
    res
      .status(422)
      .json({
        "errors":[{
          "field": "Title",
          "error": "Title is Required",
        }]
      })
  }
  if(!req.body.body){
    res
      .status(422)
      .json({
        "errors":[{
          "field": "Body",
          "error": "Body is Required",
        }]
      })
  }
  try{
    const userData = await Article.createArticle({
      ...req.body,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    res
      .status(200)
      .json(userData);
  } catch (error) {
    res
      .status(404)
      .json(error)
  }
}

async function updateArticle(req,res){
	if(!req.body.title){
		res
			.status(422)
			.json({
				"errors":[{
					"field": "Title",
					"error": "Title is Required",
				}]
			})
	}
	if(!req.body.body){
		res
			.status(422)
			.json({
				"errors":[{
					"field": "body",
					"error": "Body is Required",
				}]
			})
	}
	try{
		const existingData = await Article.findArticleById(req.params.id);
		if(!existingData){
			res
				.status(404)
				.json("Not Found")
		}
		const userData = await Article.updateArticleById(req.params.id, {
			...req.body,
			created_at: existingData.created_at,
			updated_at: Date.now()
		});
		res
			.status(200)
			.json(userData)
	} catch (error) {
		res
			.status(404)
			.json({
				"errors":error,
			})
	}
}

async function getArticlesByQuery(req,res){
  try{
    const foundArticlesCount = await Article.findArticles().length;
    const data = await Article.findArticles(req.query.page, req.query.limit);
    const pagination = {
      count: foundArticlesCount,
      page: req.query.page,
      limit: req.query.limit,
    };
    res
      .status(200)
      .json({ data, pagination })
  }
}

async function getArticleById(req,res){
	if(!req.params.id){
		res
			.status(422)
			.json({
				"errors":[{
					"field":"Id",
					"error":"Id is Required"
				}]
			})
	}
	try{
		const userData = await Article.findArticleById(req.params.id);
		res
			.status(200)
			.json(userData)
	} catch (error) {
		res
			.status(404)
			.json({
				"errors": [{
					"field": "Id",
					"error": "Not Found"
				}]
			})
	}
}

module.exports = { createArticle, updateArticle, getArticlesByQuery, getArticleById };
