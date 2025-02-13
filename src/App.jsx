import { useContext, useEffect, useState } from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import ModalAddNew from "./components/ModalAddNew";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Home from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  };
  const {user, loginContext} = useContext(UserContext)
  useEffect(() => {
    if(localStorage.getItem('token')){
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
    }
  }, [])
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
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
