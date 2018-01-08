var gameState = {
	currentMap:[],
	setDifficulty:1
}

function createGameToken(){
	return Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
}

function saveState(){
	$.post('/gstate/save',gameState,function(data){
		console.log(data);
	})
}