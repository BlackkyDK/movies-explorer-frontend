import "./Form.css";

function Form({ texts, children }) {
  return (
    <>
      <form className="form">
        {children}
        <p className="form__label">E-mail</p>
        <input type="email" className="form__input"></input>
        <p className="form__label">Пароль</p>
        <input type="password" className="form__input"></input>
        <button type="submit" className="form__button form__button_register">
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
    </>
  );
}

export default Form;
