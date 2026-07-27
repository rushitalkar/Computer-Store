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
import { useNavigate } from 'react-router-dom'
import AllProductsPage from './Pages/AllProductsPage'

function App() {
  const navigate = useNavigate()
  const {isSignedIn , isClerkLoaded} =  useAuthRequest()
  useUserSync()

  if(!isClerkLoaded) return null

  return (
    <div className='min-h-screen bg-base-100'>
    <NavBar/>
    <main className="max-w-5xl mx-auto  px-4 py-8">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/product/:id" element={isSignedIn ? <ProductPage/> : navigate("/")}/>
        <Route path="/profile" element={ isSignedIn ? <ProfilePage/> : navigate("/")}/>
        <Route path="/create" element={isSignedIn ? <CreatePage/> : navigate("/")}/>
        <Route path="/edit/:id" element={isSignedIn ? <EditProductPage/> : navigate("/")}/>
        <Route path="/products" element={<AllProductsPage/>}/>

      </Routes>
    </main>
    </div>
  )
}

export default App
