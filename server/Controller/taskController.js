const taskModel = require("../models/taskModel")
// const TaskModel = require("../models/taskModel")


module.exports.getTasks = async (req, res)=>{
    const task = await taskModel.find()
    res.send(task)
    // res.send("hii")
} 

module.exports.saveTask = (req, res)=>{
    const {task} = req.body
    taskModel.create({task})
    .then((data)=>{
        console.log("saved successfully");
        res.status(201).send(data)
    })
    .catch((err)=>{
        console.log(err);
        res.send({error: err, msg: "something went wrong"})
    })
}


module.exports.updateTask = (req, res)=>{
    const {id} = req.params;
    const {task} = req.body
    taskModel.findByIdAndUpdate(id, {task})
    .then(()=>{
        res.send("updated successfully");
    })
    .catch((err)=>{
        console.log(err);
        res.send({error: err, msg: "something went wrong"})
    })
};



module.exports.deleteTask = (req, res)=>{
    const {id} = req.params;
    taskModel.findByIdAndDelete(id)
    .then(()=>{
        res.send("deleted successfully");
    })
    .catch((err)=>{
        console.log(err);
        res.send({error: err, msg: "something went wrong in delete action"})
    })
};