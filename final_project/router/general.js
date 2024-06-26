const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const ISBN = req.params.isbn;
  res.send(books[ISBN]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let answer = []
    for(const [key, values] of Object.entries(books)){
        const book = Object.entries(values);
        for(let i = 0; i < book.length; i++){
            if (book[i][0] =='author' && book[i][1] == req.params.author){
                answer.push(books[key]);
            }
        }
    }
    if (answer.length == 0){
        return res.status(300).json({message: "Author not found"});
    }
  res.send(answer);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let answer = []
    for(const [key, values] of Object.entries(books)){
        const book = Object.entries(values);
        for(let i = 0; i < book.length; i++){
            if (book[i][0] =='title' && book[i][1] == req.params.title){
                answer.push(books[key]);
            }
        }
    }
    if (answer.length == 0){
        return res.status(300).json({message: "Title not found"});
    }
  res.send(answer);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const ISBN = req.params.isbn;
    res.send(books[ISBN].reviews);
});

module.exports.general = public_users;
