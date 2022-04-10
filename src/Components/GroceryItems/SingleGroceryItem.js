import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import GroceryItemEdit from './GroceryItemEdit'



library.add(fas)

export default function SingleGroceryItem(props) {

  const {currentUser} = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  
const deleteGroceryItem = (id) => {
  if(window.confirm(`Are you sure you wnat to delete ${props.groceryItem.Name}?`)){
    axios.delete(`http://localhost:56020/api/GroceryItem/${id}`).then(() => {props.getGroceryItems()})
  }
}

  return (
    <div className="singleResource col-md-5 m-2">

      {currentUser === process.env.REACT_APP_EMAIL_ADMIN &&
        <div>
          <button id='editLink' onClick={() => setShowEdit(true)}>
            <FontAwesomeIcon icon={['fas', 'edit']} />
          </button>
          <button id="deleteLink" onClick={() => deleteGroceryItem(props.groceryItem.GroceryItemId)}>
            <FontAwesomeIcon icon={['fas', 'trash-alt']} />
          </button>
          {showEdit &&
          <GroceryItemEdit
            groceryItem={props.groceryItem}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            getGroceryItems={props.getGroceryItems}/>
          }
        </div>
      }

      <h3>{props.groceryItem.Name}</h3>
      {props.groceryItem.Description !== null ? (
        <p>{props.groceryItem.Description}</p>
      ) : 
        <p>No Description Provided</p>
      }
    </div>
  );
}
