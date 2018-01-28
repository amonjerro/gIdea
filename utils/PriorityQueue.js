module.exports = class PriorityQueue{
	constructor(){
		this.queue = []
	}
	insert(node){
		if (this.queue.length == 0){
			this.queue.push(node)
			return true
		}
		var done = false
		var temp = ''
		var currentIndex = this.queue.length - 1
		while (!done){
			if (this.queue[Math.floor((currentIndex-1)/2)] < node){
				//Perform Switch
				temp = this.queue[Math.floor((currentIndex-1)/2)]
				this.queue[Math.floor((currentIndex-1)/2)] = this.queue[currentIndex]
				this.queue[currentIndex] = temp
				currentIndex = Math.floor((currentIndex-1)/2)
			} else {
				done = true
			}
		}
		return true
	}
	getRoot(){
		var returnable = this.queue[0]
		this.queue[0] = this.queue.pop()
		var currentK = 0
		var temp = ''
		var done = false
		while(!done){
			if (this.queue[currentK*2+1] > this.queue[currentK]){
				// Perform Switcheroo MoFo
			} else if (this.queue[currentK*2+2] > this.queue[currentK]){
				// Perform the switch
			} else {
				//Ya done now
				done = true
			}
		}
	}
}