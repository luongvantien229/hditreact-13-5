import { useContext, useEffect, useState } from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Header from "./components/Header";
import ModalAddNew from "./components/ModalAddNew";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoute";
import { useDispatch, useSelector } from "react-redux";
import { handleReFresh } from "./redux/actions/userAction";

function App() {
  const dispatch = useDispatch()
  const dataUserRedux = useSelector(state => state.user.account)
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  };
  const { user, loginContext } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleReFresh())
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>

        <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
