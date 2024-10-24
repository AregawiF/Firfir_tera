import './Onboarding.css';
import Login from '../Login/Login';
import { useState } from 'react';
import Signup from '../Signup/Signup';

const Onboarding = () => {
    const [haveAccount, setHaveAccount] = useState(false);
    
  return (
    <div className="bg-image-wrapper">
      <div className="bg-image"></div>

        <div className="card-container w-2/5 bg-gray-50 rounded-lg p-5">
            {haveAccount ? <Login /> : <Signup />}
        <div className='flex justify-center' >
            <button onClick={() => setHaveAccount(!haveAccount)} className='p-3 text-blue-700 font-semibold '>{haveAccount ? "Don't have an account? Sign up" : "Have an account? Log in"}</button>
        </div>
        </div>

    </div>
  );
};

export default Onboarding