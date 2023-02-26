import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ModalPhoto({ name, image, onHide, ...rest }) {
  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={image} className="img-fluid" height={200} alt={image} />
        <p>
          
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-success" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
ModalPhoto.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  onHide: PropTypes.func
};
