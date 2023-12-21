import Auth from "./components/Auth"
import Blogs from "./components/Blogs"
import UserBlogs from "./components/UserBlogs"
import BlogDetails from "./components/BlogDetails"
import AddBlog from "./components/AddBlog"
import Header from "./components/Header"
import { Routes, Route } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import { useEffect } from "react"
import { login } from "./store/AuthSlice"


export const serverUrl = import.meta.env.PROD
  ? "https://blog-vercel-server-xi.vercel.app/"
  : "http://localhost:5000";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(login())
    }
  },[dispatch])
  return (
    <>
      <Header />
      <Routes>
        {
         !isLoggedIn ? <Route path="/auth" element={ <Auth /> } /> :
        <>
        <Route path="/blogs" element={ <Blogs /> } />
        <Route path="/blogs/add" element={ <AddBlog /> } />
        <Route path="/myBlogs" element={ <UserBlogs /> } />
        <Route path="/myBlogs/:id" element={ <BlogDetails /> } />
        </> 
        }
        
      </Routes>
            
    </>
  )
}

export default App
