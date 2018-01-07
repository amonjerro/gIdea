module.exports = class Monster {

	constructor(db){
		this.connection = db;
	}

	getFromTemplate(templateName){
		var slf = this;
		return new Promise(function(resolve, reject){
			slf.connection.find({name:templateName}).then(function(template){
				return resolve(template);
			}).catch(function(err){
				console.log(err)
				return reject();
			})
			
		})
	}

	createTemplate(name,hp,baseDMG,xp){
		this.template = {
			name:name,
			hp:hp,
			baseDMG:baseDMG,
			xp:xp
		}
	}

	saveTemplate(){
		var slf = this; 
		if (slf.template){
			slf.connection.insert({slf.template});
		} 
	}

}