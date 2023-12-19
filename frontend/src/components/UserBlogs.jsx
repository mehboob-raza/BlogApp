import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard'


const UserBlogs = () => {
  const [user, setUser] = useState()
  const id = localStorage.getItem('userId')
  const sendRequest = async() => {
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
      .catch(err => console.log(err))
    const data = res.data
    return data
  }
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user))
  }, [])
  // console.log(user);
  return (
    <div>
       {
        user  && user.blogs.map((blog, i) => {
          return <div key={i}>
            <BlogCard
              id={blog._id}
              isUser = {true}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.image}
              user={user.name} />
           </div>
        })
      }
    </div>
  )
}

export default UserBlogs
