const express = require('express');
const router = express.Router();
const monk = require('monk');
const no_sql = require('../utils/no-sql');
const MongoConn = new no_sql();
const monk = require('monk');

/*
	0 - No Room
	1 - Empty Room
	2 - Encounter
	3 - Treasure
	4 - Boss
	5 - Start Room 
	6 - End Room
*/


function randomInt(min,max){
	return Math.floor(min + Math.random()*(max - min + 1));
}

function setStartPosition(range,map,callback){
	var lowFlip = Math.random() > 0.5;
	if (lowFlip){
		map[randomInt(0, Math.floor(range/3))] = 5;
	} else {
		map[randomInt(Math.floor(range*2/3),range-1)] = 5;
	}
	setEndPosition(lowFlip,range,map,callback);
}

function setEndPosition(lowFlip,range,map,callback){
	if (lowFlip){
		map[randomInt(Math.floor(range*2/3),range-1)] = 6;
	} else {
		map[randomInt(0, Math.floor(range/3))] = 6;
	}
	callback.json(map)
}

router.get('/map/generate',function(req,resp){
	var mapLength = req.query.x * req.query.y;
	var mapArray = []
	for (var i = 0; i < mapLength; i++){
		mapArray.push(0);
	}
	setStartPosition(mapLength,mapArray,resp)
})

router.get('/map/coordinateData',function(req,resp){
	MongoConn.games.find({'_id':monk.id(req.query.id)}).then(function(gameState){
		resp.json(gameState[0].currentMap[(req.query.x*req.query.y)+req.query.x])
	})
})

module.exports = router;