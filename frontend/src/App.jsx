import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { UserProvider } from "./context/UserContext";
import Home from './pages/Home.jsx'
import Exam from './pages/Exam.jsx'
import Analysis from './pages/Analysis.jsx'
import Studypaper from './pages/Studypaper.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Profile from './pages/Profile.jsx'
import Navbar from './components/Navbar.jsx'
import Mainhome from './pages/Mainhome.jsx'
function App() {

  return (
    <BrowserRouter>
     <UserProvider>
    <Navbar/>
      
      <Routes>
        <Route path="/" element={<Mainhome />} />
        <Route path="/generate" element={<Home />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/studypaper" element={<Studypaper />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
