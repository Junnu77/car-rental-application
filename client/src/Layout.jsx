import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'

const Layout = () => {
    const { theme } = useSelector((state) => state.theme)

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <main className={`flex-grow mt-14 mb-auto ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Layout