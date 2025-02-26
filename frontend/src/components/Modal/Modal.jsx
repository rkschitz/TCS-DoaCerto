import { Button, Modal } from 'react-bootstrap';

export default function CustomModal({
  title, 
  children, 
  show, 
  setShow, 
  submit, 
  reset, 
  submitText = "Save Changes", 
  resetText = "Cancel"
}) {

  const handleClose = () => setShow(false);
  const handleSubmit = () => {
    if (submit) submit();
    setShow(false);
  };

  const handleReset = () => {
    if (reset) reset();
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReset}>
          {resetText}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {submitText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
