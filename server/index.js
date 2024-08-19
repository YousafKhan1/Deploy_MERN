const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegisterModel = require('./models/Register');

const app = express();

app.use(cors({
  origin: ["https://deploy-mern-vercel-frontend.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());

mongoose.connect('mongodb+srv://srsharibalan2003:JWPXHm3ZejPtxAWr@vercel-mern.ade86.mongodb.net/?retryWrites=true&w=majority&appName=vercel-mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await RegisterModel.findOne({ email });

    if (existingUser) {
      res.status(400).json("Already have an account");
    } else {
      const newUser = await RegisterModel.create({ name, email, password });
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).send('Internal Server Error');
  }
});Z

module.exports = app;
