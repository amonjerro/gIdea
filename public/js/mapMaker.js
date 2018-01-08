function sizeByDifficulty(diffLevel){
	var dimensions = {x:1,y:1}
	if (diffLevel == 1){
		dimensions.x = (Math.floor(Math.random()*5))+2
		dimensions.y = (Math.floor(Math.random()*4))+2
	}
	 else if (diffLevel == 2){
		dimensions.x = (Math.floor(Math.random()*5))+4
		dimensions.y = (Math.floor(Math.random()*4))+4
	}
	else if (diffLevel == 3){
		dimensions.x = (Math.floor(Math.random()*7))+7
		dimensions.y = (Math.floor(Math.random()*6))+5
	}
	return dimensions;
}

function assembleFromDimensions(dimensions){
	var mapLength = dimensions.x * dimensions.y;
	var mapArray = []
	for (var i = 0; i < mapLength; i++){
		mapArray.push(Math.floor(Math.random()*10));
	}
	return mapArray;
}

function chopMap(){
	var map = [];
	for (var i = 0; i < gameState.currentMapDimensions.y; i++){
		map.push(gameState.currentMap.slice(i*gameState.currentMapDimensions.x,(i*gameState.currentMapDimensions.x)+gameState.currentMapDimensions.x))
	}
	return map;
}

function getCoordinateData(x,y){
	if (x*y > gameState.currentMap.length){
		console.log('Out of bounds')
		return false;
	}
	if (x >= gameState.currentMapDimensions.x){
		console.log('X-Coordinate out of bounds')
		return false;	
	}
	if (y >= gameState.currentMapDimensions.y){
		console.log('Y-Coordinate out of bounds')
		return false;	
	}
	return gameState.currentMap[x+(y*gameState.currentMapDimensions.x)]
}