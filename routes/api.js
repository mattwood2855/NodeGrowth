var express = require('express');
var router = express.Router();
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));

// ROOMS API

router.get('/rooms', function(req, res, next) {
  res.send(data.rooms);
});

router.get('/rooms/:roomId', function(req, res, next) {
  res.send(data.rooms[req.params.roomId]);
});

router.post('/rooms/:roomId', function(req, res, next){

  data.rooms[req.params.roomId] = req.body;
  fs.writeFile('settings.json', JSON.stringify(data),
    function(err){
      if(err) console.log('Error writing file:' + err);
    });
  res.send(data.rooms[req.params.roomId]);
});

router.get('/rooms/:roomId/lights', function(req, res, next) {
  res.send(data.rooms[req.params.roomId].lights);
});

router.get('/rooms/:roomId/lights/:lightId', function(req, res, next) {
  res.send(data.rooms[req.params.roomId].lights[req.params.lightId]);
});

module.exports = router;
