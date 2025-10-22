import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const about = () => {
  return (
    <section id="home" className="bg-navy-blue p-8">
      <div className="min-h-screen max-w-4xl mx-auto justify-center flex flex-col ">
        <p className="text-gray-100 text-4xl font-extrabold mb-8">
        Hello there!
        </p>
        <p className="text-gray-100 mb-4 text-left ">
        Hi! I'm Andika, a Computer Science student and aspiring software developer, passionate about building useful and efficient web applications.
        </p>
        <p className="text-gray-100 text-left">
        In my spare time, I enjoy running, weightlifting, and exploring the latest in tech.
        </p>
        <div className='mt-8 flex items-start space-x-2'>
            <a href="https://github.com/SutaSS" target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
            <FaGithub size = {50} className="text-white hover:text-gray-400 text-2xl" />
            </a>
            <a href="https://www.linkedin.com/in/andika-hernadi" target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
            <FaLinkedin size = {50} className="text-white hover:text-gray-400 text-2xl" />
            </a>
            <a href="https://www.instagram.com/andikahernadi" target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
            <FaInstagram size = {50} className="text-white hover:text-gray-400 text-2xl" />
            </a>
        </div>
      </div>
    </section>
  )
}

export default about
