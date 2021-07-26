import User from "./User";
import Search from "./Search";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import SignUp from "./SignUp";
import Login from "./Login";
import "../../styles/signUp-login.css";
import $ from "jquery";

const InfoBar = () => {
  const handleSignUpClick = () => {
    $("#overlay").fadeIn(200, function () {
      $("#box").animate({ top: "200px" }, 200);
    });
  };

  const handleLoginClick = () => {
    $("#overlay_1").fadeIn(200, function () {
      $("#box_1").animate({ top: "200px" }, 200);
    });
  };

  return (
    <div>
      <button onClick={handleSignUpClick} className="singup-icon">
        Signup
      </button>
      <button onClick={handleLoginClick} className="login-icon">
        LogIn
      </button>
      <SignUp />
      <Login />
      <Search />
      <User />
      <BurgerMenu />
    </div>
  );
};

export default InfoBar;
