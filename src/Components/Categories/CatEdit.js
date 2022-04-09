import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import CatForm from './CatForm'

export default function CatEdit(props) {
  return (
    <Modal 
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
        size='lg'>
            <ModalHeader closeButton>
                <h2>Editing {props.category.DepartmentName}</h2>
            </ModalHeader>
            <ModalBody>
                <CatForm 
                    category={props.category}
                    setShowEdit={props.setShowEdit}
                    getCategories={props.getCategories} />
            </ModalBody>
        </Modal>       
  )
}
