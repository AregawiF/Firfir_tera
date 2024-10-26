import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../../services/authApi'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../store/authSlice'; 


type FormFields = {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [login, { isLoading, error }] = useLoginMutation();
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await login(data).unwrap();
            console.log('Login Successful:', response);
            localStorage.setItem('token', response.token); 

            // Dispatch the login action to update the global state
            dispatch(loginAction()); 
            navigate('/');
            // Handle successful login (e.g., redirect, store tokens, etc.)
        } catch (err) {
            setError("root", {
                message: "Invalid email or password"
            });
        }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='' >
        <div className="email-container flex justify-center ">
            <span className="input-group-text self-center">
                <img src="/icons/email.svg" alt="email icon" className='w-6' />
            </span>
            <input {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address"}
                })} type="text" placeholder='Email' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 '/>
            {errors.email && <p className='text-red-500 ml-7'>{errors.email.message}</p>}
        </div>

        <div className='flex justify-center mt-8 '>
            <span className="input-group-text self-center">
                <img src="/icons/password.svg" alt="password icon" className='w-7 self-center' />
            </span>
            <input {...register("password", {
                required: "Password is required",
                minLength: {value: 6, message: "password must be at least 6 characters"}
            })} type="password" placeholder='Password' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5'/>
            {errors.password && <p className='text-red-500 ml-7'>{errors.password.message}</p>}
            <br />
        </div>
        <div className="flex justify-center">
            <button type='submit' className={`p-3 rounded-lg bg-blue-700 text-white font-semibold ml-7 mt-7 w-3/5 ${isSubmitting ? 'bg-blue-400': ''}`} disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Login'}</button>
        </div>
        {errors.root && <p className='text-red-500 ml-32'>{errors.root.message}</p>}

    </form>
  )
}

export default LoginForm