import {Router} from 'express';
import {Todo} from '../models/todo';
const router = Router();

let todos: Todo[] = [] 

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos});
});

router.post('/todo', (req, res, next) => {
    const newTodo: Todo = {id:new Date().toISOString(), text:req.body.text};
    todos.push(newTodo);
    res.status(200).json({success: true, message: 'added todo', todo:newTodo});
});

router.put('/todo/:todoId', (req, res, next) => {
    const t_id = req.params.todoId;
    const todoIndex = todos.findIndex(item => item.id === t_id);
    if(todoIndex>=0){
        todos[todoIndex] = {id:todos[todoIndex].id ,text: req.body.text};
        return res.status(200).json({success: true, message: 'successfully updated the todo'});
    }
    res.status(404).json({success: false, error: 'Could not find todo id'});
});

router.delete('/todo/:todoId', (req, res, next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
    res.status(200).json({success: true, message: 'deleted todo'})
});


export default router;