import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

const PrivateRoute = (props) => {
  const user = useSelector(state => state.user.account)
  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>CYou don't have permission to access this routes</p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
