import "./App.css";
import Navigation from "./Components/Navigation";
//Below we are going to import a few mechanisms from react-router-dom
//1. Router   2. Routes  (kind of like a switch)  3.Route (gives instructions on which component tree to display as different routes are encountered)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components to import


import Login from "./Components/Login/Login";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound";
import AuthProvider from "./contexts/AuthContext";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import GroceryItems from './Components/GroceryItems/GroceryItmes'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          {/* The Browser Router is aliased as Router,. We surround Navigation because it has Link components that work with the BrowserRouter component. This comes from react-router-dom's docs */}
          <Navigation />          
          <Routes>
            <Route path="/" element={<ProtectedRoute><Login /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path="groceryItems" element={<ProtectedRoute><GroceryItems /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
