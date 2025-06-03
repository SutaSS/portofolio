import React from 'react'
import GridMotion from '../reactBits/GridMotion/GridMotion'

const items = [
  'https://cdn.worldvectorlogo.com/logos/firebase-1.svg', 
  'https://cdn.worldvectorlogo.com/logos/flutter.svg',    
  'https://cdn.worldvectorlogo.com/logos/laravel-2.svg', 
  'https://cdn.worldvectorlogo.com/logos/dart.svg', 
  'https://www.php.net/images/logos/php-logo.svg',
  'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
  'https://cdn.worldvectorlogo.com/logos/firebase-1.svg', 
  'https://cdn.worldvectorlogo.com/logos/flutter.svg',    
  'https://cdn.worldvectorlogo.com/logos/laravel-2.svg', 
  'https://cdn.worldvectorlogo.com/logos/dart.svg', 
  'https://www.php.net/images/logos/php-logo.svg',
  'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
  'https://cdn.worldvectorlogo.com/logos/firebase-1.svg', 
  'https://cdn.worldvectorlogo.com/logos/flutter.svg',    
  'https://cdn.worldvectorlogo.com/logos/laravel-2.svg', 
  'https://cdn.worldvectorlogo.com/logos/dart.svg', 
  'https://www.php.net/images/logos/php-logo.svg',
  'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
  'https://cdn.worldvectorlogo.com/logos/firebase-1.svg', 
  'https://cdn.worldvectorlogo.com/logos/flutter.svg',    
  'https://cdn.worldvectorlogo.com/logos/laravel-2.svg', 
  'https://cdn.worldvectorlogo.com/logos/dart.svg', 
  'https://www.php.net/images/logos/php-logo.svg',
  'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
   'https://cdn.worldvectorlogo.com/logos/firebase-1.svg', 
  'https://cdn.worldvectorlogo.com/logos/flutter.svg',    
  'https://cdn.worldvectorlogo.com/logos/laravel-2.svg', 
  'https://cdn.worldvectorlogo.com/logos/dart.svg', 
  'https://www.php.net/images/logos/php-logo.svg',
  'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
]

const techStack = () => {
  return (
    <section id="tech stack" className="relative w-full h-screen overflow-hidden">
      <GridMotion
          items={items}
          gradientColor="#f3f4f6"
        />
    </section>
  )
}

export default techStack;
