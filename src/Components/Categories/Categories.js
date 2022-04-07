import React, {useState, useEffect} from 'react'
import './Categories.css'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import SingleCategory from './SingleCategory'
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate'

export default function Categories() {
    //Step 2 - CategoriesRead
  const [categories, setCategories] = useState([]);

  const { currentUser } = useAuth();
  const [showCreate, setShowCreate] = useState(false);

  //Step 3 - CategoriesRead (includes axios import)
  const getCategories = () => {
    axios.get("http://localhost:56020/api/categories/").then((response) => {
      setCategories(response.data);
    });
  };

  //Step 4 - CategoriesRead
  useEffect(() => {
    getCategories();
  }, []); 
  return (
    <section className="categories">
      <article className="bg-info p-5">
        <h1 className="text-center">Grocery Departments Dashboard</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
        <div className="bg-dark p-2 mb-3 text-center">
          {showCreate ? 
            <>
              <button onClick={() => setShowCreate(false)} className='btn btn-warning'>
                Cancel
              </button>
              {/* Step 6 - CatCreate - Render the CatCreate*/}
              <CatCreate 
                setShowCreate={setShowCreate}
                getCategories={getCategories}
              />
            </> :
            <button onClick={() => setShowCreate(true)} className='btn btn-info'>
              Create New Category
            </button>
          }
        </div>
      }
      <Container>
        <table className="table bg-info table-dark mt-3 mb-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Department</th>                         
            </tr>
          </thead>
          <tbody>
            {/* Step 5 CategoriesRead - Map the categories to the SingleCategory component */}
            {categories.map((x) => (
              <SingleCategory 
              key={x.CategoryId} 
              category={x} />
            ))}
          </tbody>
        </table>
      </Container>
    </section>
  );
}
