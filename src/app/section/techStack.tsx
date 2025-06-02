import React from 'react'

const techStack = () => {
  return (
    <section id="tech stack" className="bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto flex flex-col justify-center items-center">
            <h2 className="text-gray-800 text-4xl font-extrabold mb-8">Tech Stack</h2>
            <p className="text-gray-800 mb-4">
            I have experience with a variety of technologies, including:
            </p>
            <ul className="list-disc list-inside text-gray-800">
            <li>Flutter (dart)</li>
            <li>Laravel (php, tailwind css)</li>
            <li>HTML & CSS</li>
            <li>SQL(mySQL) & NoSQL(Firebase) Databases</li>
            <li>Git & Version Control</li>
            </ul>
        </div>
    </section>
  )
}

export default techStack