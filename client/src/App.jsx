import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { setUserData } from "./redux/userSlice"
import Interview from "./pages/Interview"
export const ServerUrl = import.meta.env.VITE_SERVER_URL
import  { Toaster } from "react-hot-toast"
import InterviewHistory from "./pages/InterviewHistory"
import Pricing from "./pages/Pricing"
import InterViewReport from "./pages/InterviewReport"

function App() {

  const dispatch = useDispatch()
  
  useEffect(()=>{
    const getUser = async()=>{
      try {
        const result = await axios.get(`${ServerUrl}/api/user/current-user`,{
          withCredentials: true,
        })
        const data = await result.data
        console.log("Fetched user data:", data)
        dispatch(setUserData(data.user))
      } catch (error) {
        console.log("Error fetching user:",error)
        dispatch(setUserData(null))
      }
    }
      getUser()
  },[dispatch]);
  return (
   <>
   <Toaster/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/interview" element={<Interview/>}/>
      <Route path="/history" element={<InterviewHistory/>}/>
      <Route path="/pricing" element={<Pricing/>}/>
      <Route path="/report/:id" element={<InterViewReport/>}/>
     
    </Routes>
   </>
  )
}

export default App
