import axios from "axios";
import {decodeToken, getIdToken} from './AuthService';

export default {
  // Gets all books
  // getBooks: function() {
  //   return axios.get("/api/books");
  // },
  // // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }

  //user login
  login: (credentials) => {
    return axios.post("/api/auth/login", credentials)
  },
  
  createUserIfDoesNotExist: () => {
    const user = decodeToken(getIdToken());
    return axios.post("/api/users", user)
  },

  createItem: plaidObj => {
    const data = {};
    data.user = decodeToken(getIdToken());
    data.plaidObj = plaidObj;
    return axios.post('/api/users/items', data);
  },


  accountsSync: userId => {
    console.log("getIdToken()");
    console.log(decodeToken(getIdToken()));


    // const user = {};
    // user.user_jwt ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJlbkB0aGlzaXNiYW0uY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vY2hlZGFoLmF1dGgwLmNvbS8iLCJzdWIiOiJmYWNlYm9va3wxMDE1NTQ1NjI1MzAxMjcxMiIsImF1ZCI6Ims0UWZvNXBaVVQ4YnhCYTBWNHZSbVJvYUQyNlkxMjRHIiwiaWF0IjoxNTE5MTc0MjA2LCJleHAiOjE1MTkyMTAyMDYsImF0X2hhc2giOiJCMUNmZjBtNHlrbDgzeEp1elpGSEdBIiwibm9uY2UiOiI0Ymx2LXlGR1hnSzJ5cWltVjBGMURvLXlBSmhxd25wZiJ9.ZuxGKI_YeNGGuvtporvkLT9Jd7f2kSekkrROSb4w2kM';
    // return axios.post("/api/transactions/", user)
  },


  //transactions
  getTransactionsByAccount: account =>{
    return new Promise((resolve, reject) => {
      const data = [
        {
          id: 1,
          date: "11/23/14", 
          vendor: "Google", 
          category: "Advertising", 
          gig: "Uber",
          ammount: 200.00
        },
        {
          id: 2,
          date: "11/23/14", 
          vendor: "Staples", 
          category: "Office Supplies", 
          gig: "Uber",
          ammount: 15.00
        },
        {
          id: 3,
          date: "11/23/14", 
          vendor: "Staples", 
          category: "Office Supplies", 
          gig: "Dev",
          ammount: 12.00
        },
        {
          id: 4,
          date: "11/23/14", 
          vendor: "Staples", 
          category: "Office Supplies", 
          gig: "Uber",
          ammount: 16.00
        },
        {
          id: 5,
          date: "11/23/14", 
          vendor: "Staples", 
          category: "Office Supplies",
          gig: "Dev", 
          ammount: 119.00
        },
        {
          id: 6,
          date: "11/23/14", 
          vendor: "Staples", 
          category: "Office Supplies", 
          gig: "Dev",
          ammount: 219.00
        },
        {
          id: 7,
          date: "11/23/14", 
          vendor: "Staples", 
          category: "Office Supplies", 
          gig: "Uber",
          ammount: 29.00
        }
      ];
      resolve(data);  
    });
  }
};
