const express = require('express');
	request = require('request');
	router = express.Router();
	config = require('../config');
	mongoClient = require('mongodb').MongoClient;

const getApiData = (item) => {
	return new Promise((resolve, reject) => {
		request({
			uri:`https://api.stackexchange.com/2.2/questions/featured?order=desc&sort=activity&tagged=${item}&site=stackoverflow&filter=total`,
			gzip: true,
			method: 'GET',
		}, (err, response, body) => {

			if(response.statusCode === 200) {
				body = JSON.parse(body);
				count = body.total;
				var obj = { item, count }
				resolve(obj);
			}
		});
	})
}

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Stackoverflow Data Visualization' });
	// next();
});

router.post('/', (req, res, next) => {
	var questionTags = [];
	var questionCount = [];

	if(req.body.tags) {
		tags = req.body.tags.split(',');
		Promise.all(tags.map((url) => {
  			return getApiData(url)
		})).then((result) =>  {
			mongoClient.connect(config.url, function(err, db) {
				if (err) {
					res.render('questions', { 
						title: 'Stackoverflow Data Visualization',
						message: `Connect to your db and try again`
					});
				}
				db.collection("featuredquestions").insert(result, function(err, dbres) {
					if (err) throw err;
					for (let item of dbres.ops) {
						questionTags.push(item.item);
						questionCount.push(item.count);
					}
					res.render('questions', { 
						title: `Featured question Visualization`,
						questionTags: questionTags,
						questionCount: questionCount,
						chartTitle: `Featured question tag wise`
					});
			  	});
			});
		}).catch((error) => {
			res.render('questions', { 
				title: 'Stackoverflow Data Visualization',
				message: `Connect to your db and try again`
			});
		});
	} else {
		res.render('questions', { 
			title: 'Stackoverflow Data Visualization',
			message: `Please enter a valid tag`
		});
	}
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
			try {
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
					count: count,
					chartTitle: `New question tag wise`
				});
			} catch(err) {
				res.render('new-questions', {
					title: `New Questions Visualization`,
					message: `Connect to your db and try again`
				});
			}
		} else {
			res.render('new-questions', {
				title: `New Questions Visualization`,
				message: `Connect to your db and try again`
			});
		}
	});
});

module.exports = router;
