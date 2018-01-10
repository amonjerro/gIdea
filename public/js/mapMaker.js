function sizeByDifficulty(diffLevel){
	var dimensions = {x:1,y:1}
	if (diffLevel == 1){
		dimensions.x = randomInt(4,6)
		dimensions.y = randomInt(3,5)
	}
	 else if (diffLevel == 2){
		dimensions.x = randomInt(6,9)
		dimensions.y = randomInt(5,8)
	}
	else if (diffLevel == 3){
		dimensions.x = randomInt(9,12)
		dimensions.y = randomInt(8,11)
	}
	return dimensions;
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