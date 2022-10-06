import React from "react";
import { useLocation } from "react-router-dom";

import "./Profile.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ logoutProfile, onProfileEdit, requestStatus: { message } }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [previousName, setPreviousName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [previousEmail, setPreviousEmail] = React.useState(currentUser.email);
  const [requestStatusText, setRequestStatusText] = React.useState("");
  const [isDisabled, setDisabled] = React.useState(false);
  const { pathname } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    onProfileEdit({ name, email });
    setDisabled(false);
  };

  const handleUserName = (e) => {
    setRequestStatusText("");
    const value = e.target.value;
    const err = e.target.validationMessage;
    setName(value);
    if (value !== previousName && !err) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleUserEmail = (e) => {
    setRequestStatusText("");
    const value = e.target.value;
    const err = e.target.validationMessage;
    setEmail(value);
    if (value !== previousEmail && !err) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  React.useEffect(() => {
    setRequestStatusText(message);
  }, [message]);

  React.useEffect(() => {
    setRequestStatusText("");
  }, [pathname]);

  React.useEffect(() => {
    const localStorageName = localStorage.getItem("name");
    if (localStorageName) {
      setPreviousName(localStorageName);
    }
    const localStorageEmail = localStorage.getItem("email");
    if (localStorageEmail) {
      setPreviousEmail(localStorageEmail);
    }
  }, [handleSubmit]);

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label className="profile-form__label">
          Имя
          <input
            className="profile-form__input"
            name="name"
            onChange={handleUserName}
            defaultValue={currentUser.name || ''}
            minLength="4"
            maxLength="40"
            autoComplete="off"
            required
          ></input>
        </label>
        <label className="profile-form__label">
          E-mail
          <input
            className="profile-form__input"
            name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            onChange={handleUserEmail}
            defaultValue={currentUser.email || ''}
            autoComplete="off"
            required
          ></input>
        </label>
        <div className="profile-form__group">
          <span className="profile-form__span">{requestStatusText || ""}</span>

          <button disabled={!isDisabled} className="profile-form__button">
            Редактировать
          </button>
        </div>
      </form>
      <button
        className="profile-form__logout"
        type="button"
        onClick={logoutProfile}
      >
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
