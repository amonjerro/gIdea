var setUpRequirements = {
	mapGeneration:{
		state:false,
		weight:20
	},
	initialSave:{
		state:false,
		weight:10
	}

}

function getTotalRequirementWeights(){
	var requirements = Object.keys(setUpRequirements);
	var total = 0;
	for (var i = 0; i < requirements.length; i++){
		total += setUpRequirements[requirements[i]].weight
	}
	setUpRequirements.total = total;
}

function initiate(){
	$.post('/gstate/init',gameState,function(data){
		gameState.id = data._id;
		gameState.currentMapDimensions = sizeByDifficulty(gameState.setDifficulty)
		$.get('/logic/map/generate?id='+data._id+'&x='+gameState.currentMapDimensions.x+'&y='+gameState.currentMapDimensions.y,function(data){
			saveMap(data);
		})
	})
}


initiate();