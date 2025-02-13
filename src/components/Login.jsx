import { useContext, useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {handleLoginRedux} from '../redux/actions/userAction'
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState("");

  const isLoading = useSelector(state => state.user.isLoading)
  const account = useSelector(state => state.user.account)

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }

    
    dispatch(handleLoginRedux(email, password))
  };

  const handleGoBack = () => {
    navigate('/')
  }

  const handlePressEnter = (event) => {
    if(event && event.key === 'Enter'){
        handleLogin()
    } 
  }

  useEffect(() => {
    if(account && account.auth === true){
        navigate('/')
    }
  }, [account])

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
            onKeyDown={(event) => handlePressEnter(event)}
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
          {isLoading && <i className="fa fa-spin fa-spinner"></i>}
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
