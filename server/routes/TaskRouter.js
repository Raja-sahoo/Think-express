// var express = require('express');
// var router = express.Router();

const {Router} = require("express")
var router = Router();


const  {getTasks, saveTask, updateTask, deleteTask}  = require("../Controller/taskController")



router.get("/get", getTasks)
router.post("/save", saveTask)
router.put("/update/:id", updateTask)
router.delete("/delete/:id", deleteTask)

module.exports = router;
