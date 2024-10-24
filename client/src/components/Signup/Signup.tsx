import SignupForm from './SignupForm'

const Signup = () => {
  return (
    <div className=''>
        <div className="flex justify-center mb-2">
            <img src="/Icons/Firfir_Logo.png" alt="Logo" className='w-44 rounded-xl'/>
        </div>
        <div className="form-container  mt-12">
            <SignupForm/>
        </div>
    </div>
  )
}

export default Signup