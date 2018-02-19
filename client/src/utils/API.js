import axios from "axios";

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
  }
  ,





  //transactions
  getTransactionsByAccount: () =>{
    return new Promise((resolve, reject) => {
      const data = [
        {
          date: "11/23/14", 
          vendor: "Google", 
          category: "Advertising", 
          ammount: 200.00
        },
        {
          date: "11/23/14", 
          vendor: "Staples", 
          category: "Office Supplies", 
          ammount: 19.00
        }
      ];
      resolve(data);  
    });
  }
};
