import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from "./components/404/PageNotFound";
import AddDishForm from "./components/AddDish/AddDish";
import NavBar from "./components/common/NavBar";
import RecipePage from "./components/common/RecipePage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup"; // Assuming you have a Signup component
import Onboarding from "./components/Onboarding/Onboarding";

function App() {
  return (
      <div className="">
        <NavBar userRole="cook" />
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/add-dish" element={<AddDishForm />} />
          {/* Catch-all route for 404 page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
  );
}

export default App;
