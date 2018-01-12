var gameState = {
	setDifficulty:1
}

function saveState(){
	$.post('/gstate/save',gameState,function(data){
		console.log(data);
	})
}

function saveMap(data){
	var position = {
		x:data.position,
		y:data.position,
	}
	$.post('/gstate/newMap',
		{
			id:gameState.id,
			map:data.map,
			dimensions:gameState.currentMapDimensions,
			position:position
		},function(data){
		console.log(data);
	})
}