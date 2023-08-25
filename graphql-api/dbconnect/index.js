const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://vishwasdev01:g1f1yrGDQnrkFHrU@cluster0.vpjgvvu.mongodb.net/booklist?retryWrites=true&w=majority`
    );
    console.log("Database connection is successfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports =connection
