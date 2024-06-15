const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://hongantran3804:HongAn0308%40@cluster0.o4rkvfz.mongodb.net/")
mongoose.Collection.collections.Product.drop(function (err){
  console.log(err);
})