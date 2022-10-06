class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  get _headers() {
    return {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      // 'Accept': 'application/json',
      "Content-Type": "application/json",
    };
  }

  register = (email, password, name) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      // credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponse);
  };

  authorize = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        // 'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  };

  getToken = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        // 'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      //method: "GET",
      // credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      // method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  createMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  ) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN
      ),
    }).then(this._checkResponse);
  }

  deleteMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new MainApi({
  baseUrl: 'https://api.klementeva.nomoredomains.sbs',
  // baseUrl: "http://localhost:3000",
});

export default api;
