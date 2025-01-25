import { Modal, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {deleteUser} from '../services/UserService'
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, hanldeDeleteuserFormModal } = props;

  const confirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id)
    if(res && +res.statusCode === 204){
        toast.success('Delete User success')
        handleClose()
        hanldeDeleteuserFormModal(dataUserDelete)
    } else {
        toast.error('delete User')
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
            This action can't be undone!
            Do you want delete this user <br /> <b>email = {dataUserDelete.email}</b>?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
