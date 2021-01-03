import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

const ConfirmationModal = ({
  id,
  title,
  show,
  children,
  handleConfirm,
  handleCancel,
  showButtons,
  showCancelButton,
  confirmButtonText,
  cancelButtonText
}) => (
  <Modal show={show} onHide={handleCancel} id={id}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
    <Modal.Footer>
      { showButtons &&
        <React.Fragment>
          <Button className='primary' onClick={handleConfirm}>{confirmButtonText}</Button>
          { showCancelButton && <Button onClick={handleCancel}>{cancelButtonText}</Button> }
        </React.Fragment>
      }
    </Modal.Footer>
  </Modal>
)

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  handleConfirm: PropTypes.func,
  showButtons: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired
}

ConfirmationModal.defaultProps = {
  showButtons: true,
  showCancelButton: true,
  confirmButtonText: 'Ok',
  cancelButtonText: 'Cancel'
}

export default ConfirmationModal
