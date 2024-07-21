const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const chartdata= new Schema({

    name:{
        type:String,
        require:true

    },
    email:{
       type:String,
       require:true
    },
    password:{
         type:String,
         require:true
    },
  total: {
    type: Number,
    default:0
    
  },
  label: {
    type: [String],

  },
  value: {
    type: [Number],
    
  }
});

// Create a model
// const DataModel = mongoose.model('Data', dataSchema);

// Example usage
module.exports= mongoose.model("chartdata", chartdata);

    // Save the document to the database
   