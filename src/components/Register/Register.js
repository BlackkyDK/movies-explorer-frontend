import "./Register.css";
import "../Form/Form.css";
import Auth from "../Auth/Auth";
import React from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

function Register({ onRegister, isSending, requestStatus: { message } }) {
  const texts = {
    buttonText: "Зарегистрироваться",
    subText: "Уже зарегистрированы?",
    linkText: "Войти",
    linkAddr: "/signin",
  };
  const textHeader = {
    titleText: "Добро пожаловать!",
  };

  const { values, handleChange, errors, isValid } = useFormValidation();
  const isDisabled = !isValid || !isSending;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <main className="register__main">
      <Auth textHeader={textHeader} />
      <form className="form" onSubmit={handleSubmit} action="#">
        <p className="form__label">Имя</p>
        <input
          className="form__input"
          name="name"
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.name || ""}
          autoComplete="off"
          required
        ></input>
        <span className="form__input_error">{errors.name || ""}</span>
        <p className="form__label">E-mail</p>
        <input
          type="email"
          name="email"
          className="form__input"
          onChange={handleChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          value={values.email || ""}
          autoComplete="off"
        ></input>
        <span className="form__input_error">{errors.email || ""}</span>
        <p className="form__label">Пароль</p>
        <input
          type="password"
          name="password"
          className="form__input"
          onChange={handleChange}
          value={values.password || ""}
          autoComplete="off"
          required
        ></input>
        <span className="form__input_error">{errors.password || ""}</span>
        <span className="form__input_feedback">{message}</span>
        <button
          type="submit"
          disabled={isDisabled}
          className="form__button form__button_register"
        >
          {texts.buttonText}
        </button>
      </form>
      <p className="form__text">
        {texts.subText}
        <a className="form__link" href={texts.linkAddr}>
          {" "}
          {texts.linkText}
        </a>
      </p>
    </main>
  );
}

export default Register;
