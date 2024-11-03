import './Onboarding.css';
import Login from '../Login/Login';
import { useEffect, useState } from 'react';
import Signup from '../Signup/Signup';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const Onboarding = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [haveAccount, setHaveAccount] = useState(false);
  const { isAuthenticated: authIsAuth } = useAuth();

  if (authIsAuth){
    navigate('/home');
  }

  const toggleAccountType = () => {
      setHaveAccount(prev => !prev); // Use a functional update
    };
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // Redirect to Home if authenticated
    }
  }, [isAuthenticated, navigate]); 
  return (
    <div className="bg-image-wrapper">
      <div className="bg-image"></div>
      <div className='w-2/5 pt-10 pb-5'>
        <div className="card-container w-full bg-gray-50 rounded-lg p-5 mt-52">
            {haveAccount ? <Login /> : <Signup />}
          <div className='flex justify-center' >
              <button onClick={toggleAccountType} className='p-3 text-blue-700 font-semibold '>{haveAccount ? "Don't have an account? Sign up" : "Have an account? Log in"}</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Onboarding

