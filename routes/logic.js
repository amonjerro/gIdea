const express = require('express');
const router = express.Router();
const no_sql = require('../utils/no-sql');
const MongoConn = new no_sql();
const pq = require('../utils/PriorityQueue')

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

function setStartPosition(dimensions,range,map,costMap,callback){
	var lowFlip = Math.random() > 0.5;
	var currentPosition = 0;
	if (lowFlip){
		currentPosition = randomInt(0, Math.floor(range/4));
		map[currentPosition] = 5;
	} else {
		currentPosition = randomInt(Math.floor(range*2/4),range-1);
		map[currentPosition] = 5;
	}
	setEndPosition(dimensions,currentPosition,lowFlip,range,map,costMap,callback);
}

function setEndPosition(dimensions,start,lowFlip,range,map,costMap,callback){
	var end = 0;
	if (lowFlip){
		end = randomInt(Math.floor(range*2/4),range-1);
		map[end] = 6;
	} else {
		end = randomInt(0, Math.floor(range/4));
		map[end] = 6;
	}
	createCostMap(dimensions,start,end,map,costMap,callback)
}

function createCostMap(dimensions,start,end,map,costMap,callback){
	for (var i = 0; i < costMap.length; i++){
		costMap[i] = Math.abs((end%dimensions.x)-(i%dimensions.x)) + Math.abs((Math.floor(end/dimensions.x))-(Math.floor(i/dimensions.x)))
	}
	shortestPath(dimensions,start,end,map,costMap,callback)	
}

function getNeighbours(position,dimensions){
	var neighbours = []
	//Top Left Corner of the Map
	if (position == 0){
		neighbours.push(1)
		neighbours.push(dimensions.x)
		return neighbours;
	}
	//Bottom Right Corner of the Map
	if (position == (dimensions.x*dimensions.y) - 1){
		neighbours.push(position - 1)
		neighbours.push(position - dimensions.x)
		return neighbours;
	}
	//Top Right Corner of the Map
	if (position == dimensions.x - 1){
		neighbours.push(position - 1)
		neighbours.push(position + dimensions.x)
		return neighbours;
	}
	//Bottom Left Corner of the Map
	if (position == dimensions.x*(dimensions.y-1)){
		neighbours.push(position + 1)
		neighbours.push(position - dimensions.x)
		return neighbours;
	}
	//Top Row of the Map
	if (position < dimensions.x){
		neighbours.push(position - 1)
		neighbours.push(position + 1)
		neighbours.push(position + dimensions.x)
		return neighbours;
	}
	//Left-most Column of the Map
	if (position % dimensions.x == 0){
		neighbours.push(position - dimensions.x)
		neighbours.push(position + 1)
		neighbours.push(position + dimensions.x)
		return neighbours
	}
	//Right-most Column of the Map
	if ((position+1) % dimensions.x == 0){
		neighbours.push(position - dimensions.x)
		neighbours.push(position - 1)
		neighbours.push(position + dimensions.x)
		return neighbours
	}
	//Bottom Row of the Map
	if (position > dimensions.x*(dimensions.y-1)){
		neighbours.push(position - 1)
		neighbours.push(position + 1)
		neighbours.push(position - dimensions.x)
		return neighbours;
	}
	//Anywhere fucking else
	neighbours.push(position - dimensions.x)
	neighbours.push(position - 1)
	neighbours.push(position + 1)
	neighbours.push(position + dimensions.x)
	return neighbours
}

function shortestPath(dimensions,start,end,map,costMap,callback){
	var closedSet = new Set()
	var openSet = new pq()
	openSet.insert({location:start,weight:0})
	var path = []
	var done = false
	var current = ''
	var neighbours = []
	while (openSet.allNodes().length > 0 && !done){
		current = openSet.getRoot()
		path.push(current.location)
		neighbours = getNeighbours(current.location,dimensions)
		if (current.location == end){
			done = true
		} else {
			closedSet.add(current.location)
			for (var i = 0; i < neighbours.length; i++ ){
				if (!closedSet.has(neighbours[i])){
					if (!openSet.contains(neighbours[i])){
						openSet.insert({location:neighbours[i],weight:costMap[neighbours[i]]})
					}
				}
			}
		}
	}
	if (!done){
		callback.json({map:map,costMap:costMap,startPosition:start,endPosition:end,path:[]})
		return false
	} else {
		for (var i = 0; i < path.length; i++){
			if (i != 0 && i != path.length -1){
				map[path[i]] = 1	
			}
		}
		callback.json({map:map,costMap:costMap,startPosition:start,endPosition:end,path:path})
		return true
	}

}


router.get('/map/generate',function(req,resp){
	var mapLength = req.query.x * req.query.y;
	var mapArray = [];
	var costMap = [];
	for (var i = 0; i < mapLength; i++){
		mapArray.push(0);
		costMap.push(0);
	}
	setStartPosition({x:parseInt(req.query.x),y:parseInt(req.query.y)},mapLength,mapArray,costMap,resp)
})

// router.get('/pq/test',function(req,resp){
// 	PriorityQueue.insert(10)
// 	PriorityQueue.insert(12)
// 	PriorityQueue.insert(8)
// 	PriorityQueue.insert(15)
// 	PriorityQueue.insert(30)
// 	PriorityQueue.insert(5)
// 	console.log(PriorityQueue.getRoot())
// 	resp.json(PriorityQueue.allNodes())
// })

router.get('/map/coordinateData',function(req,resp){
	MongoConn.games.find({'_id':MongoConn.turnToID(req.query.id)}).then(function(gameState){
		resp.json(gameState[0].currentMap[req.query.position])
	})
})


module.exports = router;