import "./Register.css";
import Form from "../Form/Form";
import Auth from "../Auth/Auth";

function Register() {
  const texts = {
    buttonText: "Зарегистрироваться",
    subText: "Уже зарегистрированы?",
    linkText: "Войти",
    linkAddr: "/signin",
  };
  const textHeader = {
    titleText: "Добро пожаловать!",
  };

  return (
    <main className="register__main">
      <Auth textHeader={textHeader} />
      <Form texts={texts}>
        <p className="form__label">Имя</p>
        <input
          className="form__input"
          name="name"
          minLength="2"
          maxLength="40"
        ></input>
      </Form>
    </main>
  );
}

export default Register;
