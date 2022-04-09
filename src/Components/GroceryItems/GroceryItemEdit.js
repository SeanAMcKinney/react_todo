import React from 'react'
import { Modal } from 'react-bootstrap'
import GroceryItemForm from './GroceryItemForm'

export default function GroceryItemEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}>
            <Modal.Header className='bg-info' closeButton>
                <h3>editing {props.groceryItem.Name}</h3>
            </Modal.Header>
            <Modal.Body>
                groceryItem={props.groceryItem}
                setShowEdit={props.setShowEdit}
                getGroceryItems={props.getGroceryItems} /.
            </Modal.Body>
        </Modal>
  )
}
