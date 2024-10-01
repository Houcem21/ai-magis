import './App.css'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'

import {homeLogo} from './assets';
import {Home, CreatePost} from './pages';
import { ContactBtn } from './components';

function App() {
  return (
    <BrowserRouter>
    <header className='w-full flex justify-between items-center bg-[#0B192C] sm:px-8 px-4 py-4 border-b border-b-[#1E3E62]'>
      <Link to='/'>
        <img src={homeLogo} alt="logo" className='w-20 object-contain' />
      </Link>
      <Link to='./create-post' className='font-inter font-medium bg-[#FF6500] text-white px-4 py-2 rounded-md'>Create Post</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#0B192C] min-g-[calc(100vh-73px)]">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Routes>
    </main>
    <ContactBtn />
    </BrowserRouter>
  )
}

export default App
