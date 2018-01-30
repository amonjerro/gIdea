var canvas = {}
function drawGrid(){
	//Draw the vertical lines
	for (var i = 0; i < gameState.currentMapDimensions.x; i++){
		if (i != 0){
			canvas.context.moveTo(canvas.blockSize*i,0)
			canvas.context.lineTo(canvas.blockSize*i,canvas.height)
		}
	}
	//Draw the horizontal lines
	for (var i = 0; i < gameState.currentMapDimensions.y; i++){
		if (i != 0){
			canvas.context.moveTo(0,canvas.blockSize*i)
			canvas.context.lineTo(canvas.width,canvas.blockSize*i)
		}
	}
	canvas.context.strokeStyle = "black";
	canvas.context.stroke()
}
function paintMap(){
	for (var i = 0; i < gameState.currentMap.length; i++){
		if (gameState.currentMap[i]==5){
			canvas.context.fillStyle = '#f26430';
			canvas.context.fillRect(
				canvas.blockSize*(i%gameState.currentMapDimensions.x),
				canvas.blockSize*(Math.floor(i/gameState.currentMapDimensions.x)),
				canvas.blockSize,
				canvas.blockSize)
		}
		if (gameState.currentMap[i]==6){
			canvas.context.fillStyle = '#009DDC'
			canvas.context.fillRect(
				canvas.blockSize*(i%gameState.currentMapDimensions.x),
				canvas.blockSize*(Math.floor(i/gameState.currentMapDimensions.x)),
				canvas.blockSize,
				canvas.blockSize)
		}
		if(gameState.currentMap[i]==1){
			canvas.context.fillStyle = '#8D9F87'
			canvas.context.fillRect(
				canvas.blockSize*(i%gameState.currentMapDimensions.x),
				canvas.blockSize*(Math.floor(i/gameState.currentMapDimensions.x)),
				canvas.blockSize,
				canvas.blockSize)
		}
	}
	drawGrid()
}