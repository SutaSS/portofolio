import React from 'react'

const header = () => {
  return (
    <header className='bg-gray-800 text-white p-8 z-50'>
        <nav className='relative w-full flex items-center justify-between'>
            
            <div>
                <h1 className='text-3xl font-bold'>---</h1>
            </div>
            <div>
                <ul className='flex space-x-4'>
                    <li><a href="#about me" className='hover:text-gray-400'>About</a></li>
                    <li><a href="#tech stack" className='hover:text-gray-400'>Tech Stack</a></li>
                    <li><a href="#projects" className='hover:text-gray-400'>Projects</a></li>
                </ul>
            </div>  

        </nav>
    </header>
  )
}

export default header
