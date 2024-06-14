import { useState, useEffect } from 'react';
import { Inter } from "next/font/google"
import Image from 'next/image'
import logo from './logo.png' // Importa la imagen

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex h-screen flex-col justify-center items-center bg-gradient-to-br bg-[#292F36] transition-opacity duration-1000 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      
      <div className={`flex flex-col items-center bg-[#3C3F42] p-10 rounded-lg shadow-md shadow-black transform border-2 border-gray-400 -translate-y-1/2 transition-transform duration-300 ${showContent ? 'animate-fade-in' : 'animate-fade-out'}`}>
        
        <Image src={logo} alt="Logo" className={`relative w-24 h-24 mb-5 object-contain rounded-md shadow-md shadow-black transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`} />

        <div className="text-center">
          <h1 className="text-5xl mb-5 font-bold text-gray-200">¡Bienvenido al sistema de gestión - PSA!</h1>
          <p className="text-lg text-gray-400">Tu solución integral para la gestión de proyectos</p>
        </div>

        
        <div className="flex justify-center mt-8 space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300 hover:text-gray-100 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 0 1 .964.723l.883 3.532 3.532.883a1 1 0 0 1 .723.964v.539l-3.276 1.091-1.091 3.276h-.539a1 1 0 0 1-.964-.723l-.883-3.532-3.532-.883a1 1 0 0 1-.723-.964v-.539l3.276-1.091 1.091-3.276H10zM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-8-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" clipRule="evenodd" />
          </svg>
          
        </div>
      </div>
    </div>
  )
}
