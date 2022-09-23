import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import './App.css';

function App() {
  return (
    <div className='App'>
        <Switch>
        <Route exact path="/">
        <Header />
        <Main />
        <Footer />
        </Route>
        <Route path='/signin'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Register />
      </Route>
      <Route path='/profile'>
      <Header />
        <Profile />
      </Route>
       <Route path='/movies'>
       <Header />
        <Movies />
        <Footer />
      </Route>
      <Route path='/saved-movies'>
        <Header />
        <SavedMovies />
        <Footer />
      </Route>
      <Route path='*'>
        <NotFoundPage />
      </Route>
        </Switch>
    </div>
  );
}

export default App;
