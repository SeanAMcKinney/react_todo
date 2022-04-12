//npm install yup - This is for a validation tool - see implementation below
//npm install formik - This allows us to create forms easily in react
import * as Yup from "yup";

const catSchema = Yup.object().shape({
  DepartmentName: Yup.string()
    .max(50, "Max 50 Characters")
    .required("Required"),
});

const groceryItemSchema = Yup.object().shape({
  Name: Yup.string().max(25, "Max 25 Characters").required(),
  Description: Yup.string().nullable(true).max(100, "Max 100 Characters"),
  CategoryId: Yup.number(),
});

export { groceryItemSchema };
export default catSchema;
