var gameState = {
	setDifficulty:1
}

function saveState(){
	$.post('/gstate/save',gameState,function(data){
		console.log(data);
	})
}

function saveMap(data){
	console.log(data);
	gameState.currentPosition = data.startPosition;
	gameState.currentEnd = data.endPosition;
	$.post('/gstate/newMap',
		{
			id:gameState.id,
			map:data.map,
			costMap:data.costMap,
			dimensions:gameState.currentMapDimensions,
			position:data.startPosition,
			end:data.endPosition
		},function(data){
		console.log(data);
	})
}