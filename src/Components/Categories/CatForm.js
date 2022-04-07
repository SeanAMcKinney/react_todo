import React from "react";
import { Formik, Form, Field } from "formik";
import catSchema from "../../Utiltites/validationSchema"
import axios from "axios";

export default function CatForm(props) {
  const handleSubmit = (values) => {
    console.log(values);

    if (!props.category) {   
      const catToCreate = {
        DepartmentName: values.DepartmentName
      }
      axios.post('http://localhost:56020/api/categories/', catToCreate).then(() => {
        props.setShowCreate(false)
        props.getCategories()
      })
    } else {
      console.log("edit mode");
    }
  }

  return (
    <div className="creatCategory m-2 text-white text-center">
      <Formik
        initialValues={{
          DepartmentName: props.category ? props.DepartmentName : ''
        }}
        validationSchema={catSchema}
        onSubmit={values => handleSubmit(values)}
      >
        {({errors, touched}) => (
          <Form id='catForm' className="row text-center m-auto">
            <div className="form-group m-1 p-1">
              <Field name='DepartmentName' className='form-control' placeholder='Department Name' />
              {errors.DepartmentName && touched.DepartmentName ? 
                <div className="text-danger">{errors.DepartmentName}</div> : 
                null
              }
            </div>          
            <div className="form-group m-1">
              <button className="btn btn-success" type="submit">Submit New Department</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
