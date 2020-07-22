/* eslint-disable strict */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const articlesRouter = require('./articles/articles-router');

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}));
app.use(cors());
app.use(helmet());

app.use('/articles', articlesRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;


/* all of this gets refactored to the above code....
//////////////////////////////////////////////
// GET /articles endpoint ////////////////////
// make use of the ArticlesService ///////////
//////////////////////////////////////////////
// app.get('/articles', (req, res, next) => {
//   const knexInstance = req.app.get('db');
//   ArticlesService.getAllArticles(knexInstance)
//     .then(articles => {
//       res.json(articles);
//     })
//     .catch(next);
// });

//////////////////////////////////////////////
// POST /articles endpoint ///////////////////
// make use of the ArticlesService ///////////
//////////////////////////////////////////////
// app.post('/articles', jsonParser, (req, res, next) => {
//   const { title, content, style } = req.body;
//   const newArticle = { title, content, style };
//   ArticlesService.insertArticle(
//     req.app.get('db'),
//     newArticle
//   )
//     .then(article => {
//       res
//         .status(201)
//         .location(`/articles/${article.id}`)
//         .json(article);
//     })
//     .catch(next);
// });


//////////////////////////////////////////////
// GET /articles/:article_id endpoint ////////////////////
// make use of the ArticlesService ///////////
//////////////////////////////////////////////
// app.get('/articles/:article_id', (req, res, next) => {
//   const knexInstance = req.app.get('db');
//   ArticlesService.getById(knexInstance, req.params.article_id)
//     .then(article => {
//       if (!article) {
//         return res.status(404).json({
//           error: { message: 'Article doesn\'t exist'}
//         });
//       }
//       res.json(article);
//     })
//     .catch(next);
// }); */