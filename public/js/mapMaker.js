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

function chopMap(arr){
	var map = [];
	for (var i = 0; i < gameState.currentMapDimensions.y; i++){
		map.push(arr.slice(i*gameState.currentMapDimensions.x,(i*gameState.currentMapDimensions.x)+gameState.currentMapDimensions.x))
	}
	return map;
}

function getNeighbours(){
	var neighbours = {
	}
	//Top Left Corner of the Map
	if (gameState.currentPosition == 0){
		neighbours.right = 1;
		neighbours.bottom = gameState.currentMapDimensions.x
		return neighbours;
	}
	//Bottom Right Corner of the Map
	if (gameState.currentPosition == (gameState.currentMapDimensions.x*gameState.currentMapDimensions.y) - 1){
		neighbours.left = gameState.currentPosition - 1;
		neighbours.top = gameState.currentPosition - gameState.currentMapDimensions.x
		return neighbours;
	}
	//Top Right Corner of the Map
	if (gameState.currentPosition == gameState.currentMapDimensions.x - 1){
		neighbours.left = gameState.currentPosition - 1;
		neighbours.bottom = gameState.currentPosition + gameState.currentMapDimensions.x
		return neighbours;
	}
	//Bottom Left Corner of the Map
	if (gameState.currentPosition == gameState.currentMapDimensions.x*(gameState.currentMapDimensions.y-1)){
		neighbours.right = gameState.currentPosition + 1;
		neighbours.top = gameState.currentPosition - gameState.currentMapDimensions.x
		return neighbours;
	}
	//Top Row of the Map
	if (gameState.currentPosition < gameState.currentMapDimensions.x){
		neighbours.left = gameState.currentPosition - 1;
		neighbours.right = gameState.currentPosition + 1;
		neighbours.bottom = gameState.currentPosition + gameState.currentMapDimensions.x;
		return neighbours;
	}
	//Left-most Column of the Map
	if (gameState.currentPosition % gameState.currentMapDimensions.x == 0){
		neighbours.top = gameState.currentPosition - gameState.currentMapDimensions.x;
		neighbours.right = gameState.currentPosition + 1;
		neighbours.bottom = gameState.currentPosition + gameState.currentMapDimensions.x;
		return neighbours
	}
	//Right-most Column of the Map
	if (gameState.currentPosition % (gameState.currentMapDimensions.x-1) == 0){
		neighbours.top = gameState.currentPosition - gameState.currentMapDimensions.x;
		neighbours.left = gameState.currentPosition - 1;
		neighbours.bottom = gameState.currentPosition + gameState.currentMapDimensions.x;
		return neighbours
	}
	//Bottom Row of the Map
	if (gameState.currentPosition > gameState.currentMapDimensions.x*(gameState.currentMapDimensions.y-1)){
		neighbours.left = gameState.currentPosition - 1;
		neighbours.right = gameState.currentPosition + 1;
		neighbours.top = gameState.currentPosition - gameState.currentMapDimensions.x;
		return neighbours;
	}
	//Anywhere fucking else
	neighbours.top = gameState.currentPosition - gameState.currentMapDimensions.x;
	neighbours.left = gameState.currentPosition - 1;
	neighbours.right = gameState.currentPosition + 1;
	neighbours.bottom = gameState.currentPosition + gameState.currentMapDimensions.x;
	return neighbours
}

function getCoordinateData(position){
}