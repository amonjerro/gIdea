var gameState = {
	setDifficulty:1
}

function saveState(){
	$.post('/gstate/save',gameState,function(data){
		console.log(data);
	})
}

function saveMap(map){
	console.log(map)
	$.post('/gstate/newMap',{id:gameState.id,map:map},function(data){
		console.log(data);
	})
}