module.exports = function(app){
	var router = app.loopback.Router();
	router.get('/ping', function(req, res){
		res.send('PONG!');
	});
	app.use(router);
}