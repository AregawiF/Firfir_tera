import Form from './LoginForm';
import './Login.css';

const Login = () => {
  return (
    <div className="bg-image-wrapper">
      <div className="bg-image "></div>
      <div className="card-container w-2/5 bg-gray-50 rounded-lg p-5">
            <div className=''>
                <div className="flex justify-center mb-2">
                    <img src="/Icons/Firfir_Logo.png" alt="Logo" className='w-44 rounded-xl'/>
                </div>
                <div className='text-5xl text-center'>Welcome back</div>
                    <div className="form-container  mt-12">
                        <Form/>
                    </div>
                <div className='flex justify-center'>
                    <button className='p-3 text-blue-700 font-semibold '>Don't have an account?</button>
                </div>

            </div>
      </div>
    </div>
  );
};

export default Login;
