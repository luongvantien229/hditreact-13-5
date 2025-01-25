import { useState } from "react";
import { Modal, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    console.log("🚀 ~ handleSaveUser ~ res:", res);
    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("A User is create succeed!");
      props.handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("An error...");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="exampleInputPassword1">Job</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Job"
              onChange={(event) => setJob(event.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
