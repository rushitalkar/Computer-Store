import { SignInButton , SignOutButton } from '@clerk/react'
import { useUser } from '@clerk/react'
import './App.css'
import NavBar from './Components/NavBar'
import { Routes , Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ProductPage from './Pages/ProductPage'
import ProfilePage from './Pages/ProfilePage'
import CreatePage from './Pages/CreatePage'
import EditProductPage from './Pages/EditProductPage'
import useAuthRequest from './hooks/useAuthRequest'
import useUserSync from './hooks/useUserSync'

function App() {
  const {isSignedIn , isClerkLoaded} =  useAuthRequest()
  useUserSync()

  if(!isClerkLoaded) return null

  return (
    <div className='min-h-screen bg-base-100'>
    <NavBar/>
    <main className="max-w-5xl mx-auto  px-4 py-8">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/product/:id" element={<ProductPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/edit/:id" element={<EditProductPage/>}/>
      </Routes>
    </main>
    </div>
  )
}

export default App
