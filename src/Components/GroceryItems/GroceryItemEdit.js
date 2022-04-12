import React from 'react'
import { Modal } from 'react-bootstrap'
import GroceryItemForm from './GroceryItemForm'

export default function GroceryItemEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}>
            <Modal.Header className='text-white' closeButton>
                <h3>Editing {props.groceryItem.Name}</h3>
            </Modal.Header>
            <Modal.Body>
                <GroceryItemForm
                    groceryItem={props.groceryItem}
                    setShowEdit={props.setShowEdit}
                    getGroceryItems={props.getGroceryItems} />
            </Modal.Body>
        </Modal>
  )
}
