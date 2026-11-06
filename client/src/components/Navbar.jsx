import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/react'


const Navbar = () => {

    const navigate = useNavigate()
    const {openSignIn} = useClerk()
    const {user} = useUser()


  return (
    <div className='flex justify-between items-center fixed z-5 py-3 backdrop-blur-2xl w-full px-4 sm:px-20 xl:px-32'>
       <img src={assets.logo} loading='lazy' alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate("/")}/>

    {user ? <UserButton /> : (
   <button onClick={openSignIn} className='inline-flex items-center gap-2 rounded-full text-sm bg-primary text-white py-2.5 px-10 cursor-pointer'>Get Started  <ArrowRight className='size-4'/></button>
    )}
       

    </div>
  )
}

export default Navbar
