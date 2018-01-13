const express = require('express');
const router = express.Router();
const no_sql = require('../utils/no-sql');
const MongoConn = new no_sql();

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

function setStartPosition(x,range,map,costMap,callback){
	var lowFlip = Math.random() > 0.5;
	var currentPosition = 0;
	if (lowFlip){
		currentPosition = randomInt(0, Math.floor(range/3));
		map[currentPosition] = 5;
	} else {
		currentPosition = randomInt(Math.floor(range*2/3),range-1);
		map[currentPosition] = 5;
	}
	setEndPosition(x,currentPosition,lowFlip,range,map,costMap,callback);
}

function setEndPosition(x,start,lowFlip,range,map,costMap,callback){
	var end = 0;
	if (lowFlip){
		end = randomInt(Math.floor(range*2/3),range-1);
		map[end] = 6;
	} else {
		end = randomInt(0, Math.floor(range/3));
		map[end] = 6;
	}
	createCostMap(x,start,end,map,costMap,callback)
}

function createCostMap(x,start,end,map,costMap,callback){
	var deltaAbs = 0;
	for (var i = 0; i < costMap.length; i++){
		deltaAbs = Math.abs(end - i);
		costMap[i] = (deltaAbs - (Math.floor(deltaAbs /x)*x))+(Math.floor(deltaAbs /x));
	}
	callback.json({map:map,costMap:costMap,startPosition:start,endPosition:end})
}


router.get('/map/generate',function(req,resp){
	var mapLength = req.query.x * req.query.y;
	var mapArray = [];
	var costMap = [];
	for (var i = 0; i < mapLength; i++){
		mapArray.push(0);
		costMap.push(0);
	}
	setStartPosition(req.query.x,mapLength,mapArray,costMap,resp)
})

router.get('/map/coordinateData',function(req,resp){
	MongoConn.games.find({'_id':MongoConn.turnToID(req.query.id)}).then(function(gameState){
		resp.json(gameState[0].currentMap[req.query.position])
	})
})


module.exports = router;