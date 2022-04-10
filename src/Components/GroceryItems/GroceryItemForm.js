import React, { useState, useEffect, Profiler } from "react";
import { Formik, Form, Field } from "formik";
import { groceryItemSchema } from '../../Utiltites/validationSchema';
import axios from "axios";

export default function GroceryItemForm(props) {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get("http://localhost:56020/api/categories/").then((response) => {
      setCategories(response.data);
    });
  };

  const handleSubmit = (values) => {
      console.log(values);

      if(!props.groceryItem) {         
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
            GroceryItemId: props.groceryItem.GroceryItemId,
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
        Name: props.groceryItem ? props.groceryItem.Name : "",
        Description: props.groceryItem ? props.GroceryItemSchema.Description : "",
        CategoryId: props.groceryItem ? props.groceryItem.CategoryId : "",
      }}
      validationSchema={groceryItemSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched }) => (
        <Form id="resourceForm">
          <div className="form-group m-3">
            <Field name="Name" className="form-control" placeholder="Name" />
            
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
            
            {errors.Description && touched.Description ? (
              <div className="text-danger">{errors.Description}</div>
            ) : null}
          </div>
         
          <div className="form-group m-3">
            <Field as="select" name="CategoryId" className="form-control">
              <option value="" disabled>
                --Please Choose Category--
              </option>
             
              {categories.map((cat) => (
                <option key={cat.CategoryId} value={cat.CategoryId}>
                  {cat.DepartmentName}
                </option>
              ))}
            </Field>
          </div>
          <div className="form-group m-3">
            <button type="submit" className="btn btn-success m-3 gi1 gi2">
              Submit Grocery Item to API
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
