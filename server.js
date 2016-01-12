var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
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
    var matchedTodo = _.findWhere(todos, {id:todoId});
    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
        
    }
});

//Post Data
app.post('/todos', function(req, res){
    //console.log(req);
    var model = _.pick(req.body, 'description', 'completed');
    
    if(_.isBoolean(model.completed) && _.isString(model.description) && model.description.trim().length >= 1){
        model.id = toNextId++;
        todos.push(model);
        res.json(model);  
    } else{
        res.status(400).send();
    }
    
    
});

//delete data
app.delete('/todos/:id', function(req,res){
    var todoId = parseInt(req.params.id);
    var deleteID = _.findWhere(todos, {id:todoId});
    todos = _.without(todos, deleteID);
    if(deleteID){
        res.json(deleteID);
    } else{
        res.status(404).send();
    }
})

app.listen(PORT, function(){
    console.log('Express Server Started on '+ PORT)
})