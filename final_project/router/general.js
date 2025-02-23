const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  if(req.body.username && req.body.password){
      checkUser = users.filter(obj => obj.username === req.body.username);
      if(checkUser.length === 0){
          users.push({username: req.body.username, password: req.body.password})
          return res.send(`User "${req.body.username}" successfully registered`)
      }
      else
      res.status(400).json({message: "User already exists"});
  }
  res.status(400).json({message: "User credentials are invalid"});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
  try{
  return res.send(JSON.stringify(await books,null,4));}
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data.",
    })
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  try{
  return res.send(JSON.stringify(await books[req.params.isbn],null,4));}
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data.",
    })
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  try{
  let myBook;
    for(let i = 1;i<=10;i++){
        if(await books[i].author === decodeURIComponent(req.params.author)) myBook = books[i];
    }
  return res.send(JSON.stringify(myBook,null,4));}
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data.",
    })
  }
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  try{
  let myBook;
    for(let i = 1;i<=10;i++){
        if(await books[i].title === decodeURIComponent(req.params.title)) myBook = books[i];
    }
  return res.send(JSON.stringify(myBook,null,4));}
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving data.",
    })
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books[req.params.isbn].reviews,null,4));
});

module.exports.general = public_users;