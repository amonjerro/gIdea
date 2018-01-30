module.exports = class PriorityQueue{
	constructor(){
		this.queue = []
		this.set = new Set()
	}
	allNodes(){
		return this.queue
	}
	insert(node){
		// Node Structure = {location:Int,weight:Int}
		this.queue.push(node)
		this.set.add(node.location)
		if (this.queue.length == 1){
			return true
		}
		var done = false
		var temp = ''
		var currentIndex = this.queue.length - 1
		while (!done){
			if (Math.floor((currentIndex-1)/2) < 0){
				done = true
			} else if (this.queue[Math.floor((currentIndex-1)/2)].weight > node.weight){
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
	contains(node){
		return this.set.has(node)
	}
	getRoot(){
		if (this.queue.length == 1){
			this.set.clear()
			return this.queue.pop()
		}
		var returnable = this.queue[0]
		this.set.delete(returnable.location)
		this.queue[0] = this.queue.pop()
		var currentK = 0
		var temp = ''
		var done = false
		while(!done){
			if ((this.queue.length-1 >= currentK*2+1) && this.queue[currentK*2+1].weight < this.queue[currentK].weight){
				// Perform Switcheroo MoFo
				temp = this.queue[currentK]
				this.queue[currentK] = this.queue[currentK*2+1]
				this.queue[currentK*2+1] = temp
				currentK = currentK*2+1
			} else if ((this.queue.length-1 >= currentK*2+2) && (this.queue[currentK*2+2].weight < this.queue[currentK].weight)){
				// Perform the switch
				temp = this.queue[currentK]
				this.queue[currentK] = this.queue[currentK*2+2]
				this.queue[currentK*2+2] = temp
				currentK = currentK*2+2
			} else {
				//Ya done now
				done = true
			}
		}
		return returnable
	}
}