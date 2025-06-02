import React from 'react'

const project = () => {
  return (
    <section id="project" className="bg-gray-800 p-8">
      <div className="max-w-4xl min-h-screen mx-auto flex flex-col justify-center items-center">
        <h2 className="text-gray-100 text-4xl font-extrabold mb-8">Projects</h2>
        <p className="text-gray-100 mb-4">
          Here are some of the projects I've worked on:
        </p>
        <ul className="list-disc list-inside text-gray-800">
          <li>Project 1: Description of project 1</li>
          <li>Project 2: Description of project 2</li>
          <li>Project 3: Description of project 3</li>
        </ul>
      </div>
    </section>
  )
}

export default project
