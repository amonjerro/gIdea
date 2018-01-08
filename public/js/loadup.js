function initiate(){
	gameState.token = createGameToken();
	gameState.currentMapDimensions = sizeByDifficulty(gameState.setDifficulty)
	gameState.currentMap = assembleFromDimensions(gameState.currentMapDimensions)
}

initiate();