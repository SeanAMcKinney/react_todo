import React, {useState, useEffect} from 'react'
import './Categories.css'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import SingleCategory from './SingleCategory'
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate'
import background from '../../images/CategoriesDashboardPic.jpg'

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
    <section className="categories" style={{ backgroundImage: `url(${background})`}}>
      <article className="p-5">
        <h1 className="text-center text-white">Grocery Departments Dashboard</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
        <div className="p-2 mb-3 text-center">
          {showCreate ? 
            <>
              <button onClick={() => setShowCreate(false)} className='btn btn-warning s2'>
                Cancel
              </button>
              {/* Step 6 - CatCreate - Render the CatCreate*/}
              <CatCreate 
                setShowCreate={setShowCreate}
                getCategories={getCategories}
              />
            </> :
            <button onClick={() => setShowCreate(true)} className='btn btn-outline-light s1'>
              Create New Category
            </button>
          }
        </div>
      }
      <Container>
        <table className="table table-dark mt-5 mb-3">
          <thead className="table-color text-uppercase">
            <tr>
              <th>Department</th> 
              {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
                <th>Actions</th>
              }                        
            </tr>
          </thead>
          <tbody className="">
           
            {categories.map((x) => (
              <SingleCategory 
              key={x.CategoryId} 
              category={x}
              getCategories={getCategories}
              />
            ))}
          </tbody>
        </table>
      </Container>
    </section>
  );
}
