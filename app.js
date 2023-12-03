

const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/Sample", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

const itemSchema = new mongoose.Schema({
  itemName: String,
  details: String,
  serialNo: Number
});

const Item = new mongoose.model("Item", itemSchema);



app.post('/api/v1/item/new', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
});

app.get('/api/v1/item', async(req,res)=>{
  try{
    const items = await Item.find()
    res.status(200).json({
      success:true,
      items
    })

  }
  catch{
    res.status(500).json({
      success: false,
      message: 'Error fetching  products'
    });

  }

}) 
app.put('/api/v1/item/:id', async(req,res)=>{
  try{
    let item = await Item.findById(req.params.id)
    if(!item){
      res.status(500).json({
        success:false,
        message:"Product is not found"
      })
    }
    item= await Item.findByIdAndUpdate(req.params.id,req.body,{new:true,
      useFindAndModify:true,
      runValidators:true})
    res.status(200).json({
      success:true,
      item
    })

  }
  catch{
    res.status(500).json({
      success: false,
      message: 'Error updating '
    });

  }

}) 
app.delete('/api/v1/item/:id', async(req,res)=>{
  try{
     const product = await Item.findByIdAndRemove(req.params.id)
    if(!product){
     return res.status(404).json({
        success:false,
        message:"item is not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"item is deleted succefully"
    })

  }
  catch(error)
  {
    res.status(500).json({
      success: false,
      message: 'Error deleting '
    });

  }

}) 

app.listen(4500, () => {
  console.log('Server is working at http://localhost:4500');
})
 