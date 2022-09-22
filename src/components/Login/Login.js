import "./Login.css";
import Form from "../Form/Form";
import Auth from "../Auth/Auth";

function Login() {
  const texts = {
    buttonText: "Войти",
    subText: "Ещё не зарегистрированы?",
    linkText: "Регистрация",
    linkAddr: "/signup",
  };
  const textHeader = {
    titleText: "Рады видеть!",
  };

  return (
    <main className="login__main">
      <Auth textHeader={textHeader} />
      <Form texts={texts} />
    </main>
  );
}

export default Login;
