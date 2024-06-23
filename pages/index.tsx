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


        <div className="flex flex-col items-center  justify-center mt-8 space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200 hover:text-gray-500 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
