import axios from "axios";

const instance = axios.create({
  baseURL: "https://tifa-tutorial-app.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    // "Access-Control-Allow-Origin": 'http://localhost:3000/'
    "Access-Control-Allow-Origin": 'https://tifa-tutorial-app.herokuapp.com'
  }
});

// We call axios (in a const as instance) get, post, put, delete method corresponding to HTTP Requests: GET, POST, PUT, DELETE to make CRUD Operations.

export function getAll() {
  return instance.get("/tutorials");
};

export function getTutorial(id) {
  return instance.get(`/tutorials/${id}`);
};

export function createTutorial(data) {
  return instance.post("/tutorials", data);
};

export function updateTutorial(id, data) {
  return instance.patch(`/tutorials/${id}`, data);
}

export function removeTutorial(id) {
  return instance.delete(`/tutorials/${id}`);
}

export function removeAll() {
  return instance.delete("/tutorials");
}

export function findByTitle(title) {
  return instance.get(`/tutorials?title=${title}`);
};

export function getAllPublished() {
  return instance.get("/published");
}


