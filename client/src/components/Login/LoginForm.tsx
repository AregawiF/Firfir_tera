import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../../services/authApi'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../store/authSlice'; 
import { useAuth } from '../auth/AuthProvider';
import emailIcon from "../../assets/icons/email.svg"
import passwordIcon from "../../assets/icons/password.svg"

type FormFields = {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [login, { isLoading, error }] = useLoginMutation();
    const { login: authLogin } = useAuth(); // Use the login method from AuthProvider
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await login(data).unwrap();
            authLogin(response.token, response.role); 
            dispatch(loginAction()); 
            navigate('/');
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
                <img src={emailIcon} alt="email icon" className='w-6' />
            </span>
            <input {...register("email", {
                required: "Email is required",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address"}
                })} type="text" placeholder='Email' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 h-10'/>
        </div>
            {errors.email && <p className='text-red-500 ml-20 aria-live="polite text-sm'>{errors.email.message}</p>}

        <div className='flex justify-center mt-8 '>
            <span className="input-group-text self-center">
                <img src={passwordIcon} alt="password icon" className='w-7 self-center' />
            </span>
            <input {...register("password", {
                required: "Password is required",
                minLength: {value: 6, message: "password must be at least 6 characters"}
            })} type="password" placeholder='Password' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 h-10'/>
            <br />
        </div>
            {errors.password && <p className='text-red-500 ml-20 aria-live="polite" text-sm'>{errors.password.message}</p>}
        <div className="flex justify-center">
            <button type='submit' className={`p-3 rounded-lg bg-blue-700 text-white font-semibold ml-7 mt-7 w-3/5 ${isSubmitting ? 'bg-blue-400': ''}`} disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Login'}</button>
        </div>
        {errors.root && <p className='text-red-500 ml-32 aria-live="polite'>{errors.root.message}</p>}

    </form>
  )
}

export default LoginForm