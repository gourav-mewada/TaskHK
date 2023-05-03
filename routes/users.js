const mongoose=require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect('mongodb://127.0.0.1:27017/hkdatabase');


var userSchema=mongoose.Schema({
  name:{

    type:String,
    required:true
  },
  email:{

    type:String,
    required:true
  },mobile:{

    type:String,
    required:true
  },

  taskid: { type: mongoose.Schema.Types.ObjectId, ref: 'Task'},

});

Users=mongoose.model('Users',userSchema);

module.exports=Users;
