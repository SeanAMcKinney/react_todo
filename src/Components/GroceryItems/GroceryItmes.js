import React, { useState, useEffect } from "react";
import "./GroceryItems.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import SingleGroceryItem from "./SingleGroceryItem";
import GroceryItemCreate from "./GroceryItemCreate";
import { useAuth } from "../../contexts/AuthContext";
import background3 from '../../images/groceryitembackground.jpg'

export default function GroceryItems() {
  const [groceryItems, setGroceryItems] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const { currentUser } = useAuth();

  const getGroceryItems = () => {
    
    axios.get("http://localhost:56020/api/GroceryItem/").then((response) => {
      console.log(response);
      setGroceryItems(response.data);
    });
  };

  
  useEffect(() => {
    getGroceryItems();
  }, []); 
  return (
    <section className="resources" style={{ backgroundImage: `url(${background3})`}}>
      <article className=" p-5">
        <h1 className="text-center text-white">Grocery Items</h1>
      </article>

      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && (
        <div className="p-2 mb-3 text-center">
          <button
            className="btn btn-color btn-outline-light gi1"
            onClick={() => setShowCreate(!showCreate)}
          >
            {!showCreate ? "Create New Grocery Item" : "Close Form"}
          </button>
          <div className="createContainer">
            {showCreate && (
              <GroceryItemCreate
                getGroceryItems={getGroceryItems}
                setShowCreate={setShowCreate}
              />
            )}
          </div>
        </div>
      )}
    
      <Container>
        <article className="resourceGallery row justify-content-center">
          {groceryItems.map((x) => (
            <SingleGroceryItem
              key={x.GroceryItemId}
              groceryItem={x}
              getGroceryItems={getGroceryItems}
            />
          ))}
        </article>
      </Container>
    </section>
  );
}
