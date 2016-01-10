var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];

var toNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req,res){
   res.send('Todo API') ;
});

//Get All Todos
app.get('/todos', function(req, res){
    res.json(todos);
});

//Get Todos by ID
app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id);
    var matchedTodo;
    todos.forEach(function (value) {
        if (value.id === todoId) {
            matchedTodo = value;
        }
    });
    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
        
    }
});

//Post Data
app.post('/todos', function(req, res){
    var model = req.body;
    model.id = toNextId++;
    todos.push(model);
    res.json(req.body);
});

app.listen(PORT, function(){
    console.log('Express Server Started on '+ PORT)
})