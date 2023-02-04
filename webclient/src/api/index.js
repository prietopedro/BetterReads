import axios from "axios";

// we will define a bunch of API calls here.
const apiUrl = "";
//"https://betterreads1.herokuapp.com" || 
// Google Books API URL for all book queries
// Documentation URL: https://developers.google.com/books/docs/v1/using#WorkingVolumes
// You can perform a volumes search by sending an HTTP GET request to the following URI:
const googleAPIURL = "https://www.googleapis.com/books/v1/volumes";

const googleBookDetailURL = "https://www.googleapis.com/books/v1/volumes";



const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getUser = () => {
  return axios.get(apiUrl + "/api/user", { withCredentials: true }).then(response => {
    return response.data
  });
}

const signup = obj => {
  return axios.post(apiUrl + "/api/auth/register", obj, { withCredentials: true }).then(response => {
    return response.data
  });
};

const login = obj => {
  return axios.post(apiUrl + "/api/users/login", obj, { withCredentials: true }).then(response => {
    return response.data
  });
};

const logout = () => {
  return axios.post(apiUrl + "/api/auth/logout", {}, { withCredentials: true }).then(response => {
    return response.data
  });
}

const bookSearch = ({ searchQuery, page }) => {
  return axios
    .get(`${apiUrl}/api/books?title=${searchQuery}&page=${page}`, { withCredentials: true })
    .then(response => response.data);
};

const bookSearchOne = ({ id }) => {
  return axios
    .get(`${apiUrl}/api/books/${id}`)
    .then(response => response.data);
};

const editUserBook = ({ book_id, status }) => {
  return axios
    .put(`${apiUrl}/api/user/books/${book_id}`, { status }, { withCredentials: true })
    .then(response => response.data);
};

const getUserBook = ({ isbn10 }) => {
  return axios
    .get(`${apiUrl}/api/user/books/${isbn10}}`, { withCredentials: true })
    .then(response => response.data);
};

const getUserBooks = () => {
  return axios
    .get(`${apiUrl}/api/user/books`, { withCredentials: true })
    .then(response => response.data);
};

const getUserShelves = () => {
  return axios
    .get(`${apiUrl}/api/user/shelves`, { withCredentials: true })
    .then(response => response.data);
}
const getUserShelf = (id) => {
  return axios
    .get(`${apiUrl}/api/user/shelves/${id}`, { withCredentials: true })
    .then(response => response.data);
}

const addShelf = (obj) => {
  return axios
    .post(`${apiUrl}/api/user/shelves`, obj, { withCredentials: true })
    .then(response => response.data);
}

const deleteShelf = (shelfId) => {
  return axios
    .delete(`${apiUrl}/api/user/shelves/${shelfId}`, { withCredentials: true })
    .then(response => response.data);
}

const addBookToShelf = (obj, id) => {
  return axios
    .post(`${apiUrl}/api/user/shelves/${id}/book`, obj, { withCredentials: true })
    .then(response => response.data);
}
const removeBookFromShelf = (obj, id) => {
  return axios
    .delete(`${apiUrl}/api/user/shelves/${id}/book`, {
      withCredentials: true
      , data: obj
    })
    .then(response => response.data);
}

const addBookToUserBooks = (obj) => {
  return axios
    .post(`${apiUrl}/api/user/books`, obj, { withCredentials: true })
    .then(response => response.data);
}

export { addBookToUserBooks, addBookToShelf, removeBookFromShelf, sleep, bookSearch, signup, login, getUser, logout, editUserBook, bookSearchOne, getUserBooks, getUserShelves, deleteShelf, addShelf, getUserBook, getUserShelf };
