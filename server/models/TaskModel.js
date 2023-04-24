const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema({
task:{
    type: Object,
    required: true
}
})

module.exports = mongoose.model("Task", taskSchema)