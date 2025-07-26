const express = require('express');
const todo = require('../models/todoModel');
const router = express.Router()

router.get("/",async (req,res)=>{
    try{
        const todos = await todo.find();
        res.status(200).json(todos)
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
    
})

router.get("/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        console.log(id,'id');
        const todoItem = await todo.findById(id); // Pass the ID directly
        res.status(200).json(todoItem)
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
    
})



router.post("/",async(req,res)=>{
    try{
        const {title} = req.body;
        const newTodo = new todo({title});
        const saveTodo = await newTodo.save();
        res.status(201).json(saveTodo);
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
    
})


router.put('/:id',async(req,res) => {
    try{
        const {title,completed} = req.body;
        const updateTodo = await todo.findByIdAndUpdate(
        req.params.id,
        {title,completed},
        {new:true}
        )
        res.status(200).json(updateTodo)
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
    
})

router.delete('/:id',async(req,res) => {
    try{
        
        const updateTodo = await todo.findByIdAndDelete(
        req.params.id,
        )
        res.status(200).json({
            message : "deleted succesfully",
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
    
})



router.delete("/",async (req,res)=>{
    try{
        const todos = await todo.deleteMany({});
        res.status(200).json({
            message : "all todos deleted",
            todo : todos
        })
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
    
})


module.exports = router;