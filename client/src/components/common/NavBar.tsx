import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../auth/AuthProvider';
import { logout } from '../../store/authSlice';
import './NavBar.css';
import { resetFavorites } from '../../store/favoritesSlice';
import { favoritesApi } from '../../services/favoritesApi';

import accountIcon from "../../assets/icons/account.svg"
import mainLogo from "../../assets/icons/Firfir_Logo.png"

const NavBar: React.FC = () => {
  const { userRole, logout: authLogout } = useAuth(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    authLogout();                      // Update AuthProvider state
    dispatch(logout());                // Update Redux state if necessary
    dispatch(resetFavorites());
    dispatch(favoritesApi.util.resetApiState());
    navigate('/onboarding');           // Redirect to onboarding page
  };

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
        <div className="flex justify-between bg-gray-100 p-3 py-5 ">
            <Link to="/home" className='flex w-1/6'>
              <div className="flex ml-6 ">
                  <img src={mainLogo} alt="Logo" className='w-20 rounded-sm'/>
                  <div className="text-xl font-semibold ml-2 my-auto">Firfir Tera</div>
              </div>
            </Link>
            <div className="w-11/12 flex align-middle">
              <div className="nav-rapper flex py-auto w-full ">
                <nav className='w-full flex '>
                  <ul className={`flex justify-between align-middle ml-16  ${userRole === 'viewer'? 'w-2/6' : 'w-3/6'} `}>
                    <li className='my-auto nav-item'><Link to="/home">Home</Link></li>
                    {userRole === 'cook' && (
                      <>
                        <li className='my-auto nav-item'><Link to="/my-dishes">My Dishes</Link></li>
                        <li className='my-auto nav-item'><Link to="/add-dish">Add Dish</Link></li>
                      </>
                    )}
                    <li className='my-auto nav-item'><Link to="/favorites">Favorites</Link></li>
                    <li className='my-auto nav-item'><Link to="/contact-us">Contact us</Link></li>
                  </ul>
                </nav>


                <div className="relative mr-6" ref={dropdownRef}>
                  <img
                    src={accountIcon}
                    alt="account"
                    className="w-12 cursor-pointer"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 z-20">
                          <Link to={`/profile`}>My Profile</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 z-20">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left text-red-700 font-bold"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div> )}
                  </div>

              </div>
            </div>
        </div>
    </div>
  )
}

export default NavBar