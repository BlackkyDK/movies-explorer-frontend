import { Link } from "react-router-dom";
import "./Auth.css";
import logo from "../../images/logo.svg";

function Auth({ textHeader }) {
  return (
    <div className="auth-header">
      <Link to="/">
        <img className="auth-header__logo" src={logo} alt="лого"></img>
      </Link>
      <h2 className="auth-header__title">{textHeader.titleText}</h2>
    </div>
  );
}

export default Auth;
