import React, { useState, useEffect } from "react";
import "./GroceryItems.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import SingleGroceryItem from "./SingleGroceryItem";
import GroceryItemCreate from "./GroceryItemCreate";
import { useAuth } from "../../contexts/AuthContext";

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
    <section className="resources">
      <article className="bg-info p-5">
        <h1 className="text-center">Grocery Items</h1>
      </article>

      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && (
        <div className="bg-dark p-2 mb-3 text-center">
          <button
            className="btn btn-info"
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
