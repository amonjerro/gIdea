var gameState = {
	setDifficulty:1
}

function saveState(){
	$.post('/gstate/save',gameState,function(data){
		console.log(data);
	})
}

