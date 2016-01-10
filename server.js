var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
    id:1,
    description:'Go to mall',
    completed:true
},{
    id:2,
    description:'Go to cinema',
    completed:false
},{
    id:3,
    description:'Go to Market',
    completed:false
},{
    id:4,
    description:'Go to Market',
    completed:false
},{
    id:6,
    description:'Go to Market',
    completed:false
}];

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


app.post('/todos', function(req, res){
    res.json(todos);
});

app.listen(PORT, function(){
    console.log('Express Server Started on '+ PORT)
})