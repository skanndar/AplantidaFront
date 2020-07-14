import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  profile() {
    return this.auth
      .get("/auth/profile")
      .then((data) => data)
      .catch((err) => {
        console.log("error :>> ", err);
        throw err;
      });
  }

  favorites(plantId) {
    return this.auth
      .put("/api/user-favorites", { plantId })
      .then((data) => data)
      .catch((err) => {
        console.log("error :>> ", err);
        throw err;
      });
  }

  userData(fName, lName, image, email, genre) {
    return this.auth
      .put("/api/user", { fName, lName, image, email, genre })
      .then((data) => data)
      .catch((err) => {
        console.log("error :>> ", err);
        throw err;
      });
  }

  signup(agreement, confirm, email, fName, genre, lName, password) {
    return this.auth
      .post("/auth/signup", {
        agreement,
        confirm,
        email,
        fName,
        genre,
        lName,
        password,
      })
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
    // .then((response) => response.data);
  }

  login(email, password) {
    console.log("auth email, password :>> ", email, password);
    return this.auth
      .post("/auth/login", { email, password })
      .then(({ data }) => {
        console.log("data :>> ", data);
        return data;
      })

      .catch((err) => {
        throw err;
      });
    // .then((response) => response.data);
  }

  logout() {
    return this.auth.get("/auth/logout", {}).then(({ data }) => data);
    // return this.auth.post("/auth/logout", {}).then((response) => response.data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
    // return this.auth.get("/auth/me").then((response) => response.data);
  }

  search(searchStr) {
    return this.auth
      .post("/api/plants", { searchStr })
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  }

  addReview(title, text, stars, user, plant) {
    return this.auth
      .post("/api/review", { title, text, stars, user, plant })
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  }
  deleteReview(reviewId) {
    return this.auth
      .delete(`/api/review/${reviewId}`)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
