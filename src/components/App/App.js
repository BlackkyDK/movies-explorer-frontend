import {
  Route,
  Switch,
  useLocation,
  Redirect,
  useHistory,
} from "react-router-dom";
import React from "react";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Register from "../Register/Register";
import Login from "../Login/Login";

import Profile from "../Profile/Profile";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import NotFoundPage from "../NotFoundPage/NotFoundPage";
import api from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  const [isRegisterSending, setRegisterSending] = React.useState(true);
  const [isRegisterStatus, setRegisterStatus] = React.useState({});

  const [isLoginSending, setLoginSending] = React.useState(true);
  const [isLoginStatus, setLoginStatus] = React.useState({});

  const [isProfileStatus, setProfileStatus] = React.useState({});
  const [message, setMessage] = React.useState("");

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMoviesUser, setSavedMoviesUser] = React.useState([]);

  const history = useHistory();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push(pathname);
          }
        })
        .catch(() => {
          setMessage("Ошибка токена.");
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getProfile()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch(() => {
          setMessage("Ошибка авторизации.");
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getMovies(jwt)
        .then((data) => {
          setSavedMoviesUser(data.filter((i) => i.owner === currentUser._id));
        })
        .catch(() => {
          setMessage("Ошибка при загрузке сохраненных фильмов.");
        });
    }
  }, [currentUser]);

  const handleRegister = ({ email, password, name }) => {
    setRegisterSending(false);
    api
      .register(email, password, name)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setRegisterStatus({
            message: "Пользователь с таким email уже существует.",
          });
        } else {
          setRegisterStatus({
            message: "При регистрации пользователя произошла ошибка.",
          });
        }
        setRegisterSending(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    setLoginSending(false);
    api
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          setLoginStatus({
            message: "Вы ввели неправильный логин или пароль.",
          });
        } else if (err.statusCode === 400) {
          setLoginStatus({
            message: "Переданный токен некорректен.",
          });
        } else {
          setLoginStatus({
            message: "При авторизации произошла ошибка.",
          });
        }
        setLoginSending(true);
      });
  };

  const handleProfileEdit = (user) => {
    setProfileStatus({});
    api
      .editProfile(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        setProfileStatus({
          message: "Профиль обновлён.",
        });
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          setProfileStatus({
            message: "Пользователь с таким email уже существует.",
          });
        } else {
          setProfileStatus({
            message: "При обновлении профиля произошла ошибка.",
          });
        }
      });
  };

  const handleCardSave = (movie) => {
    api
      .createMovie(movie)
      .then((newMovie) => {
        setSavedMoviesUser((movies) => [newMovie, ...movies]);
      })
      .catch(() => {
        setMessage("При сохранении фильма произошла ошибка.");
      });
  };

  const handleCardDelete = (movie) => {
    api
      .deleteMovie(movie)
      .then(() => {
        setSavedMoviesUser((movies) =>
          movies.filter((m) => m._id !== movie._id)
        );
      })
      .catch(() => {
        setMessage("При удалении фильма произошла ошибка.");
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.clear();
    // localStorage.removeItem("jwt");
    // localStorage.removeItem("initialMovies");
    // localStorage.removeItem("query");
    // localStorage.removeItem("checkbox");
    // localStorage.removeItem("searchResults");
    setCurrentUser("");
    setLoginStatus({});
    setRegisterStatus({});
    setProfileStatus({});
    setSavedMoviesUser(null);
    history.push("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path="/signin">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login
                onLogin={handleLogin}
                isSending={isLoginSending}
                requestStatus={isLoginStatus}
              />
            )}
          </Route>
          <Route path="/signup">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register
                onRegister={handleRegister}
                isSending={isRegisterSending}
                requestStatus={isRegisterStatus}
              />
            )}
          </Route>
          <Route path="/profile">
            <Header />
            <ProtectedRoute
              path="/profile"
              requestStatus={isProfileStatus}
              component={Profile}
              onProfileEdit={handleProfileEdit}
              logoutProfile={handleSignOut}
              loggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/movies">
            <Header />
            <ProtectedRoute
              component={Movies}
              loggedIn={isLoggedIn}
              handleMovieSave={handleCardSave}
              handleMovieDelete={handleCardDelete}
              cardsList={savedMoviesUser}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header />
            <ProtectedRoute
              component={SavedMovies}
              handleMovieDelete={handleCardDelete}
              loggedIn={isLoggedIn}
              cardsList={savedMoviesUser}
            />
            <Footer />
          </Route>

          <Route path="/*">
            <NotFoundPage />
          </Route>

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
