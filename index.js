var express = require('express');
var pg = require('pg');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

app.get('/db', function (request, response) {
  pg.connect("postgres://ajaskyfxhmuwte:ELq1a7YYmKZapU1xpZCC17Qgpx@ec2-54-83-9-127.compute-1.amazonaws.com:5432/d4pee7n4jrq6n", function(err, client, done) {
    if(err){
      console.error(err);
    }else{
       client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result.rows); }
    });
    }	
  });
})