const express = require("express");


const app = express();
var PORT = 3000;
app.use(express.json());
const blogModel=require('./model');
require('./connection')
//Write missing code here and all the CRUD operations on the database

app.post('/blogs', async (req, res) => {
  try {
      const newBlog = new blogModel(req.body);
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


app.get('/blogs', async (req, res) => {
  try {
      const blogs = await blogModel.find();
      res.status(200).json(blogs);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.get('/blogs/:id', async (req, res) => {
  try {
      const blog = await blogModel.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      res.status(200).json(blog);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


app.put('/blogs/:id', async (req, res) => {
  try {
      const updatedBlog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
      });
      if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
      res.status(200).json(updatedBlog);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


app.delete('/blogs/:id', async (req, res) => {
  try {
      const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);
      if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
      res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});