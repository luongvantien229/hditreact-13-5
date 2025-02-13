import { useContext, useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const {loginContext} = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState("");

  const [loadingAPI, setLoadingAPI] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }

    setLoadingAPI(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      loginContext(email, res.token)
      navigate('/')
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingAPI(false)
  };

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Login</div>
        <div className="text">Email or Username</div>
        <input
          value={email}
          type="text"
          placeholder="Email or Username"
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-2">
          <input
            value={password}
            type={isShowPassword === true ? "text" : "password"}
            placeholder="Password..."
            onChange={(event) => setPassword(event.target.value)}
          />
          <i
            className={
              isShowPassword === true ? "fa fa-eye" : "fa fa-eye-slash"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>

        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          {loadingAPI && <i className="fa fa-spin fa-spinner"></i>}
          Login
        </button>
        <div className="back">
          <i className="fa fa-angle-left"></i> 
          <span onClick={() => handleGoBack()}>&nbsp; Go back</span>
        </div>
      </div>
    </>
  );
};

export default Login;
