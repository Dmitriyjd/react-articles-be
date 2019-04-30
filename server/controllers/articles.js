const Article = require('../models/article');

async function createArticle(req,res){
  if(!req.body.title){
    res
      .status(422)
      .json({
        "errors":[{
          "field": "title",
          "error": "title is required",
        }]
      })
  }
  if(!req.body.body){
    res
      .status(422)
      .json({
        "errors":[{
          "field": "body",
          "error": "body is required",
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

}

async function getArticlesByQuery(req,res){

}

async function getArticleById(req,res){

}

module.exports = { createArticle, updateArticle, getArticlesByQuery, getArticleById };
