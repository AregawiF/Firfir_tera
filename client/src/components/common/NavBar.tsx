import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
  userRole: 'viewer' | 'cook';
}

const NavBar : React.FC<Props> = ({ userRole }) => {
  return (
    <div>
        <div className="flex justify-between bg-gray-100 p-3">
            <div className="flex ml-6 w-2/12">
                <img src="/Icons/Firfir_Logo.png" alt="Logo" className='w-12 rounded-sm'/>
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
            
          
            <div className="flex mr-6 place-self-end">
                <button className="p-2 bg-red-700 text-white rounded-md">Logout</button>
            </div>
        </div>

    </div>
  )
}

export default NavBar