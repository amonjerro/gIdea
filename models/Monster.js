module.exports = class Monster {

	constructor(db){
		this.connection = db;
	}

	getFromTemplate(templateName){
		var slf = this;
		return new Promise(function(resolve, reject){
			slf.connection.monsters.find({name:templateName}).then(function(template){
				return resolve(template);
			}).catch(function(err){
				console.log(err)
				return reject();
			})
			
		})
	}

	createTemplate(name,hp,baseDmg,defense,init,xp){
		this.template = {
			name:name,
			hp:hp,
			baseDmg:baseDmg,
			defense:defense,
			init:init,
			xp:xp
		}
	}

	saveTemplate(){
		var slf = this; 
		if (slf.template){
			slf.connection.insert(slf.template);
		} 
	}

}