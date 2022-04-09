import React, { useState, useEffect, Profiler } from "react";
//Below we import Formik which will build the form and keep track of changes in the form
import { Formik, Form, Field } from "formik";
import { groceryItemSchema } from '../../Utiltites/validationSchema';
import axios from "axios";

export default function GroceryItemForm(props) {
  //Below is the functinality to get categories to populae the dropdown list in the form
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get("http://localhost:56020/api/categories/").then((response) => {
      setCategories(response.data);
    });
  };

  //Create a local function that will submit the form to the ResourceAPI
  const handleSubmit = (values) => {
      console.log(values);
      //If statement that checks to see if a prop called resource is being passed in. If not we will execute the create code. If so we will execute the edit code.
      if(!props.groceryItem) {
          //console.log('create mode')
          const groceryItemToCreate = {
              Name: values.Name,
              Description: values.Description
          };
          axios.post('http://localhost:56020/api/GroceryItem/', groceryItemToCreate).then(() => {
              props.getGroceryItems();
              props.setShowCreate(false);
          });
      }
      else
      {
          const groceryItemToEdit = {
            GroceryItmeId: props.groceryItem.GroceryItmeId,
            Name: values.Name,
            Description: values.Description,
            CategoryId: values.CategoryId
          }
          axios.put('http://localhost:56020/api/GroceryItem/', groceryItemToEdit).then(() => {
            props.setGroceryItems()
            props.setShowEdit(false)
          })
      }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Formik
      initialValues={{
        //Here we assign the values of the objects in the forms's initialValues prop. For Create, we will set all of the values to an empty string. But we need a ternary operator in each value to check against if there is a prop called resource (which will pass in an Edit version), then we set the value to that object's value.
        Name: props.groceryItem ? props.groceryItem.Name : "",
        Description: props.groceryItem ? props.GroceryItemSchema.Description : "",
        CategoryId: props.groceryItem ? props.groceryItem.CategoryId : "",
      }}
      validationSchema={groceryItemSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched }) => (
        <Form id="groceryItemForm">
          <div className="form-group m-3">
            <Field name="Name" className="form-control" placeholder="Name" />
            {/* Below is the validation UI */}
            {errors.Name && touched.Name ? (
              <div className="text-danger">{errors.Name}</div>
            ) : null}
          </div>
          <div className="form-group m-3">
            <Field
              name="Description"
              as="textarea"
              className="form-control"
              placeholder="Description"
              style={{ resize: "none", height: "5em" }}
            />
            {/* Below is the validation UI */}
            {errors.Description && touched.Description ? (
              <div className="text-danger">{errors.Description}</div>
            ) : null}
          </div>
          {/* Below we will handle the input for CategoryId, showing CategoryName */}
          <div className="form-group m-3">
            <Field as="select" name="CategoryId" className="form-control">
              <option value="" disabled>
                --Please Choose Category--
              </option>
              {/* Below we map each category to another option element in this select list. The value is what we are passing to handleSubmit and the name is what the user will see. */}
              {categories.map((cat) => (
                <option key={cat.CategoryId} value={cat.CategoryId}>
                  {cat.DepartmentName}
                </option>
              ))}
            </Field>
          </div>
          <div className="form-group m-3">
            <button type="submit" className="btn btn-info m-3">
              Submit Grocery Item to API
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
