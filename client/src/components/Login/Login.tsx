import LoginForm from './LoginForm';

const Login = () => {
  return (
        <div className='mx-7'>
            <div className="flex justify-center mb-2">
                <img src="/Icons/Firfir_Logo.png" alt="Logo" className='w-36 rounded-sm'/>
            </div>
            <div className='text-5xl text-center'>Welcome back</div>
                <div className="form-container  mt-12">
                    <LoginForm/>
                </div>
        </div>
  );
};

export default Login;
