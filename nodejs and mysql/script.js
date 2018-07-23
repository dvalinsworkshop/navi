var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
//properties
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sampleDB'
});

/*
connection.connect(function(err){
    //callback
    if(!!err){
        console.log('Error');
    }else{
        console.log('Connected');
    }
});
*/

app.get('/', function(req, resp){
    //mysql stuff
    connection.getConnection(function(err, tempCont){
        if(!!err){
            tempCont.release();
            console.log('Error');
        }else{
            console.log('Connected!');

            tempCont.query('SELECT * FROM mySampleTable', function(err, rows, fields){
                tempCont.release();
                if(!!err){
                    console.log('Error in the query');
                }else{
                    resp.json(rows);
                }
            });
        }
    });

    /*
    connection.query("SELECT * FROM mySampleTable", function(err, rows, fields){
        //callback
        if(!!err){
            console.log('Error in the query');
        }else{
            //parse with your rows/fields
            console.log('Successful query\n');
            console.log(rows[1].Name);
            resp.send('Hello, ' + rows[0].Name );
        }
    });
    */
});

app.listen(1337);