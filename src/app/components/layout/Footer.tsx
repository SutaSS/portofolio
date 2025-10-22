import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Andika Hernadi. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
