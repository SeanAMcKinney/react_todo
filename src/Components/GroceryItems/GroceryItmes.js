//Step 1 - Read - Add useEffect and useState to the import
import React, { useState, useEffect } from "react";
import "./GroceryItems.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import SingleGroceryItem from "./SingleGroceryItem";
import GroceryItemCreate from "./GroceryItemCreate";
import { useAuth } from '../../contexts/AuthContext'

export default function GroceryItems() {
  //Step 2 - Create a hook to house the data - usf => tab
  const [groceryItems, setGroceryItems] = useState([]);
  //Above we put empty brackets in the initial value for resources so that this file will recongnize resources as an array fom the beginning. Below we are going to use .map() to read the data, and .map() is only avilable with collections in JS.

const [showCreate, setShowCreate] = useState(false);
const { currentUser } = useAuth();

  //Step 3- Create the function to get the Resources from our API.
  //Make sure that if the API is not deployed, that it is actively running in your browers.  We will CTRL + F5 in the ResourcesAPI and have an instance running to make this function work properly.
  //Sean / Your - Local port: http://localhost:51766/  (in this case) + api/resources
  const getGroceryItems = () => {
    //In order to make the request to the API, we must first install and import axios - npm install axios
    axios.get("http://localhost:56020/api/GroceryItem/").then((response) => {
      console.log(response);
      setGroceryItems(response.data);
    });
  };

  //Step 4 - useEffect will automate the component getting the resources as it renders in the virtual DOM. uef +> tab
  useEffect(() => {
    getGroceryItems();
  }, []); //An empty array in the 2nd param will allow useEffect to run once.
  //At this point, we can visit the Resources component in the brower and test to to see our data.

  return (
    <section className="groceryItems">
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
            {showCreate && 
              <GroceryItemCreate 
              getResources={getGroceryItems}
              setShowCreate={setShowCreate}
              />
            }
          </div>
        </div>
      )}
      {/* Step - 5 - READ - creat the UI - See SingleResource.js for full implementation */}
      <Container>
        <article className="groceryItemGallery row justify-content-center">
          {groceryItems.map((x) => (
            <SingleGroceryItem
              key={x.GroceryItemId}
              groceryItem={x} />
          ))}
        </article>
      </Container>
    </section>
  );
}