import AddDishForm from "./components/AddDish/AddDish";
import NavBar from "./components/common/NavBar";
import RecipePage from "./components/common/RecipePage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Onboarding from "./components/Onboarding/Onboarding";

function App() {
  return (
    <div>
      {/* <Onboarding/> */}
      <NavBar userRole="viewer"/>
      <NavBar userRole="cook"/>
      {/* <Home/> */}
      {/* <RecipePage/> */}
      <AddDishForm/>
    </div>
  );
}

export default App;
