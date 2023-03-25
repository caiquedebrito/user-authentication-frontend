import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { EditProfileSection } from './pages/Home/EditProfileSection'
import { UsersSection } from "./pages/Home/UsersSection"
import { Login } from './pages/Login'
import { PrivateRoute } from './pages/PrivateRoute'
import { PublicRoute } from './pages/PublicRoute'
import { SignUp } from './pages/SignUp'

function App() {

  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }/>
      <Route path="/signup" element={
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      }/>
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      }>
        <Route path="/edit" element={<EditProfileSection />}/>
        <Route path="/" element={<UsersSection />}/>
      </Route>
    </Routes>
  )
}

export default App
