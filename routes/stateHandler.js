const express = require('express');
const router = express.Router();
const monk = require('monk');
const no_sql = require('../utils/no-sql');
const MongoConn = new no_sql();


router.post('/init',function(req,resp){
	MongoConn.games.insert(req.body).then(function(result){
		console.log(result);
		resp.json(result);
	})
})

router.post('/save',function(req,resp){
	MongoConn.games.update({'_id':monk.id(req.body.id)},req.body).then(function(){
		resp.json({ok:true})
	}).catch(function(){
		resp.json({ok:false})
	})
});

router.post('/newMap',function(req,resp){
	var map = req.body['map[]'];
	map = map.map(function(num){ return parseInt(num)})
	console.log(req.body)
	MongoConn.games.update(
		{'_id':monk.id(req.body.id)},
		{'$set':
			{
				currentMap:map,currentMapDimensions:
					{
						'x':parseInt(req.body['dimensions[x]']),
						'y':parseInt(req.body['dimensions[y]'])
					},
				currentPosition:{'x':req.body['position[x]'],'y':req.body['position[y]']}
			}
		}).then(function(){
		resp.json({ok:true})
	}).catch(function(){
		resp.json({ok:false})
	})
})

module.exports = router;