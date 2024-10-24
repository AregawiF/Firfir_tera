import { SubmitHandler, useForm } from 'react-hook-form';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

type signupFields = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    title: string;
    bio: string;
}

const SignupForm = () => {
    const { register, handleSubmit, setError, watch, formState: {errors, isSubmitting} } = useForm<signupFields>();
    const onSubmit: SubmitHandler<signupFields> = async (data) =>{
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            // throw new Error();
            console.log(data)
        } catch (err) {
            setError("root", {
                message: "Error from the backend"
            })
        }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='' >
        <div className="names flex justify-center">
            <div className="firstName-container flex ">
                <span className="input-group-text self-center">
                    <img src="/icons/user.svg" alt="user icon" className='w-6' />
                </span>
                <input {...register("firstName", {
                    required: "Name is required",
                    minLength: {value: 4, message: "Name must be at least 4 characters"}
                })} type="text" placeholder='First Name' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5 '/>
            </div>
            <div className="lastName-container flex ">
                <input {...register("firstName", {
                    required: "Name is required",
                    minLength: {value: 4, message: "name must be at least 4 characters"}
                })} type="text" placeholder='Last Name' className='border-2 border-gray-400 rounded-lg p-2 ml-5  '/>
                {errors.firstName && <p className='text-red-500 ml-7'>{errors.firstName.message}</p>}
            </div>
        </div>
        <div className="email-container flex justify-center mt-4 ">
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

        <div className='flex justify-center mt-4 '>
            <span className="input-group-text self-center">
                <img src="/icons/password.svg" alt="Password icon" className='w-7 self-center' />
            </span>
            <input {...register("password", {
                required: "Password is required",
                minLength: {value: 6, message: "Password must be at least 6 characters"}
            })} type="password" placeholder='Password' className='border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5'/>
            {errors.password && <p className='text-red-500 ml-7'>{errors.password.message}</p>}
            <br />
        </div>
        <div className=' text-center  '>
            <div className='text-2xl my-4'>What will you be doing?</div>
            <input
                {...register("type", { required: "Please select an option" })}
                type="radio"
                value="view"
                className="ml-2"
            /> View Recipes
            <input
                {...register("type", { required: "Please select an option" })}
                type="radio"
                value="post"
                className="ml-10"
            /> Post Recipes
            {errors.type && <p className='text-red-500 ml-7'>{errors.type.message}</p>}
            {watch("type") === "post" && (
                <div className="mt-4">
                    <div className="flex justify-center mt-4">
                        <input
                            {...register("title", { required: "Title is required" })}
                            type="text"
                            placeholder="Title"
                            className="border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5"
                        />
                        {errors.title && <p className='text-red-500 ml-7'>{errors.title.message}</p>}
                    </div>
                    <div className="flex justify-center mt-4">
                        <textarea
                            {...register("bio", { required: "Bio is required" })}
                            placeholder="Bio"
                            className="border-2 border-gray-400 rounded-lg p-2 ml-5 w-4/5"
                        />
                        {errors.bio && <p className='text-red-500 ml-7'>{errors.bio.message}</p>}
                    </div>
                </div>
            )}
        </div>
        <div className="flex justify-center">
            <button type='submit' className={`p-3 rounded-lg bg-blue-700 text-white font-semibold ml-7 mt-7 w-3/5 ${isSubmitting ? 'bg-blue-400': ''}`} disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Sign up'}</button>
        </div>
        {errors.root && <p className='text-red-500 ml-32'>{errors.root.message}</p>}

    </form>
  )
}

export default SignupForm