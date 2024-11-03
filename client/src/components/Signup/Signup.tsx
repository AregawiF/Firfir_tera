import SignupForm from './SignupForm'
import mainLogo from "../../assets/icons/Firfir_Logo.png";

const Signup = () => {
  return (
    <div className='mx-7 '>
        <div className="flex justify-center mb-2 ">
            <img src={mainLogo} alt="Logo" className='w-44 rounded-sm'/>
        </div>
        <div className="form-container  mt-8">
            <SignupForm/>
        </div>
    </div>
  )
}

export default Signup