import { useClerk, useUser, Show } from '@clerk/react'
import {ChevronLeft,  Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  ['/ai', 'Dashboard', House],
  ['/ai/write-articles', 'Write Articles', SquarePen],
  ['/ai/blog-titles', 'Blog Titles', Hash],
  ['/ai/generate-images', 'Generate Images', Image],
  ['/ai/remove-background', 'Remove Background', Eraser],
  ['/ai/remove-object', 'Remove Object', Scissors],
  ['/ai/review-resume', 'Review Resume', FileText],
  ['/ai/community', 'Community', Users]

]

const Sidebar = ({sidebar, setSidebar}) => {

    const {user} = useUser()
    const {signOut, openUserProfile} = useClerk()
    const [shrink, setShrink] = useState(false)

  return (
    <div className={`${shrink ? 'w-24' : "w-60"} h-full bg-white border-r border-gray-200 flex flex-col justify-between relative items-center max-sm:absolute max-sm:top-14 bottom-0 ${sidebar ? 'translate-x-0' : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out`}>

        <div className='absolute top-1.5 right-1.5'>
             <ChevronLeft className={`text-gray-600 transition-transform transform duration-75 ease-in size-4.5 ${shrink ? "rotate-180" : "rotate-0"} `}  onClick={() => setShrink(prev => !prev)}/>
        </div>
       
       <div className='my-7 w-full'>
          <img src={user?.imageUrl} alt="" className={`${shrink ? "w-6.5" : "w-13"} aspect-square object-cover rounded-full mx-auto`}/>
          <h1 className={` ${shrink ? 'text-sm' : "text-base"} whitespace-nowrap mt-1 text-center`}>{shrink ? user?.firstName : user?.fullName}</h1>

          <div className='px-6 mt-5 w-full font-medium text-sm text-gray-600'>
            {navItems.map(([href, title, Icon]) => (
                <NavLink key={href} to={href} end={href === "/ai"} className={({isActive}) => `px-3.5 py-2.5 items-center gap-3 flex rounded ${isActive ? "bg-linear-to-r from-[#3C81F6] to-[#9234EA] text-white" : ""}`} onClick={() => setSidebar(false)}>

                    {({isActive}) => (
                        <>
                        <p><Icon className={`size-4 ${isActive ? "text-white" : ""}`}/></p>
                         
                         <p className={` whitespace-nowrap overflow-hidden ${shrink ? "hidden" : "block"}`}>{title}</p>
                        </>
                    )}

                </NavLink>
            ))}
          </div>
       </div>

       <div className={`w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between ${shrink ? "flex-col" : "flex-row"}`}>

        <div className={`flex gap-2 items-center cursor-pointer ${shrink ? "flex-col" : "flex-row"}`} onClick={openUserProfile}>
           <img src={user?.imageUrl} className='w-8 duration-300 transition-all rounded-full' alt="" />
           <div>
            <h1 className='text-sm transition-all duration-300 font-medium'>{shrink ? user?.firstName  :user?.fullName}</h1>
            <p className={`text-xs transition-all duration-300 ${shrink && "text-center"} text-gray-500 `}>
              <Show when={{ plan: 'premium' }} fallback="Free">
            Premium
            </Show> Plan
            </p>
           </div>
        </div>
        <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition-all duration-300 cursor-pointer'/>

       </div>

    </div>
  )
}

export default Sidebar
