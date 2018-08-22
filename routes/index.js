const express = require('express');
	request = require('request');
	router = express.Router();
	config = require('../config');
	mongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Stackoverflow Data Visualization' });
  // next();
});

/* GET new questions for all tags. */
router.get('/new-questions', (req, res, next) => {
	request({
		uri: `https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow`,
		gzip: true,
		method: 'GET',
	}, async (err, response, body) => {
		var tags= [];
		var count = [];
		
		if(response.statusCode === 200) {
			const db = await mongoClient.connect(config.url);
			body = JSON.parse(body);
			dbres = await db.collection('newquestions').insert(body);

			for (let item of dbres.ops[0].items) {
				tags.push(item.name);
				count.push(item.count);
			}

			res.render('new-questions', {
				title: `New Questions Visualization`,
				tags: tags,
				count: count
			});
		} else {
			res.render('new-questions', {
				title: `New Questions Visualization`,
				message: `Connect to your db and try again`
			});
		}
	});
});

module.exports = router;
