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
		createCanvas()
		$.get('/logic/map/generate?id='+data._id+'&x='+gameState.currentMapDimensions.x+'&y='+gameState.currentMapDimensions.y,function(data){
			newMap(data)
		})
	})
}

function loadUp(){
	createCanvas()
}
function createCanvas(){
	canvas.blockSize = 60
	canvas.width = gameState.currentMapDimensions.x * canvas.blockSize
	canvas.height = gameState.currentMapDimensions.y * canvas.blockSize
	$('#canvasHolder').append('<canvas id="mainCanvas" width="'+canvas.width+'" height="'+canvas.height+'"></canvas>')
	canvas.context = document.getElementById('mainCanvas').getContext('2d')
}
function newMap(data){
	gameState.currentPosition = data.startPosition;
	gameState.currentEnd = data.endPosition;
	gameState.costMap = data.costMap;
	gameState.currentMap = data.map
	paintMap()
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


initiate();