'use strict';

module.exports = function(CoffeeShop) {
	CoffeeShop.status = function(cb){
		var currentDate	= new Date(),
			currentHour	= currentDate.getHours(),
			OPEN_HOUR	= 6,
			CLOSE_HOUR	= 20;
		console.log('Current hour is %d', currentHour);
		var response;
		if(currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR){
			response = 'We are open for business'
		} else {
			response = 'Sorry, we are closed. Open daily from 6 AM to 8 PM'
		}
		cb(null, response);
	}
	CoffeeShop.remoteMethod(
		'status', {
			http:{
				path: '/status',
				verb: 'get'
			},
			returns:{
				arg: 'status',
				type: 'string'
			}
		}
	);

	CoffeeShop.getName = function(shopId, cb){
		CoffeeShop.findById(shopId, function(err, instance){
			var response = 'Name of the coffee shop is ' + instance.name;
			cb(null, response);
			console.log(response);
		})
	}

	CoffeeShop.remoteMethod(
		'getName',
		{
			http:{path:'/getname', verb:'get'},
			accepts: {arg: 'id', type:'number', http:{source: 'query'}},
			returns: {arg: 'name', type:'string'}
		}
	)

	CoffeeShop.getCity = function(shopId, cb){
		CoffeeShop.findById(shopId, function(err, instance){
			var response;
			if(instance){
				response = 'City of the coffee Shop with ID ' + shopId + ' is ' + instance.city;
			} else {
				response = 'Sorry, ID not found';
			}
			cb(null, response);
			console.log(response)
		})
	}

	CoffeeShop.remoteMethod(
		'getCity',
		{
			http:{path:'/getcity', verb:'get'},
			accepts: {arg:'id', type:'number', http:{source: 'query'}},
			returns: {arg: 'city', type:'string'}
		}
	)
};