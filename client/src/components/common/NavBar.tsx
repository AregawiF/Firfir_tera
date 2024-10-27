import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

interface Props {
  userRole: 'viewer' | 'cook';
}

const NavBar : React.FC<Props> = ({ userRole }) => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [triggerLogout, { isLoading, error }] = useLogoutMutation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
    try {
      await triggerLogout({}).unwrap();
      dispatch(logout()); 
      navigate('/onboarding'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

    const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
        <div className="flex justify-between bg-gray-100 p-3 py-5">
            <div className="flex ml-6 w-2/12">
                <img src="/Icons/Firfir_Logo.png" alt="Logo" className='w-20 rounded-sm'/>
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
                    <li className='my-auto'><Link to="/about-us">About Us</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
            
          
            {/* <div className="flex mr-6 place-self-end">
                <button className="p-2 bg-red-700 text-white rounded-md">Logout</button>
            </div> */}
            {/* <img src="/icons/account.svg" alt="acount" className='w-12'/>
            <div className="flex mr-6 place-self-end">
              <button
                onClick={handleLogout}
                className="p-2 bg-red-700 text-white rounded-md"
                disabled={isLoading}
              >
                Logout
              </button>
            </div> */}

            
            <div className="flex mr-6 place-self-end relative">
                <img
                  src="/icons/account.svg"
                  alt="account"
                  className="w-12 cursor-pointer"
                  onClick={toggleDropdown}
                />

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <Link to="/profile">My Profile</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <button
                          onClick={handleLogout}
                          disabled={isLoading}
                          className="w-full text-left text-red-700 font-bold"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
          </div>


        </div>

    </div>
  )
}

export default NavBar