import React from 'react'
import GroceryItemForm from './GroceryItemForm'

export default function GroceryItemCreate(props) {
  return (
    <article className='creatResource m-2 text-white justify-content-center'>
        <GroceryItemForm 
            setShowCreate={props.setShowCreate}
            getGroceryItems={props.getGroceryItems}
        />
    </article>
  )
}
