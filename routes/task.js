const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  taskname: { type: String, },
  tasktype: { type: String, }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;