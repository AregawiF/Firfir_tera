import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../auth/AuthProvider';
import { logout } from '../../store/authSlice';

const NavBar: React.FC = () => {
  const { userRole, logout: authLogout } = useAuth(); 
  console.log(userRole)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    authLogout();                      // Update AuthProvider state
    dispatch(logout());                // Update Redux state if necessary
    navigate('/onboarding');           // Redirect to onboarding page
  };

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

  return (
    <div>
        <div className="flex justify-between bg-gray-100 p-3 py-5 ">
            <div className="flex ml-6 w-2/12">
                <img src="/icons/Firfir_Logo.png" alt="Logo" className='w-20 rounded-sm'/>
                <div className="text-xl font-semibold ml-2 my-auto ">Firfir Tera</div>
            </div>
            <div className="w-11/12 flex align-middle">
              <div className="nav-rapper flex py-auto w-full ">
                <nav className='w-full flex '>
                  <ul className={`flex justify-between align-middle ${userRole === 'viewer'? 'w-36' : 'w-2/6'} `}>
                    <li className='my-auto'><Link to="/home">Home</Link></li>
                    {userRole === 'cook' && (
                      <>
                        <li className='my-auto'><Link to="/my-dishes">My Dishes</Link></li>
                        <li className='my-auto'><Link to="/add-dish">Add Dish</Link></li>
                      </>
                    )}
                    <li className='my-auto'><Link to="/favorites">Favorites</Link></li>
                  </ul>
                </nav>


                <div className="relative mr-6">
                  <img
                    src="/icons/account.svg"
                    alt="account"
                    className="w-12 cursor-pointer"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
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