import { Routes, Route, useLocation } from 'react-router-dom';
import PageNotFound from "./components/404/PageNotFound";
import AddDishForm from "./components/AddDish/AddDish";
import NavBar from "./components/common/NavBar";
import RecipePage from "./components/common/RecipePage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Onboarding from "./components/Onboarding/Onboarding";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthProvider';
import Mydishes from './components/Mydishes/Mydishes';
import ProfilePage from './components/Profile/ProfilePage';
import ContactUs from './components/contactUs/ContactUs';
import Favorites from './components/Favorites/Favorites';

function App() {
  const location = useLocation();

  const hideNavBarRoutes = ["/onboarding"];
  return (
    <AuthProvider>
      <div className="h-full min-h-screen">
        {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
        {/* <NavBar/> */}
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route 
            path="/add-dish" 
            element={
              <ProtectedRoute requiredRole="cook">
                <AddDishForm />
              </ProtectedRoute>
            } />
          <Route 
            path="/my-dishes" 
            element={
              <ProtectedRoute requiredRole="cook"> 
                <Mydishes/>
              </ProtectedRoute>
            } 
            />

          <Route path="/my-dishes" element={<Mydishes/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
