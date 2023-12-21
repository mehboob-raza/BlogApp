import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard'
import {serverUrl} from '../App'

const Blogs = () => {
  const [blogs, setBlogs] = useState()

  const sendRequest = async () => {
    const res = await axios.get(`${serverUrl}/api/blog`)
      .catch(err => console.log(err))
    const data = await res.data

    return data
  }

  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs))
  },[])
  // console.log(blogs);


  return (
    <div>
      {
        blogs && blogs.map((blog, i) => {
          return <div key={i}>
            <BlogCard
              id={blog._id}
              isUser = {localStorage.getItem('userId') === blog.user._id}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.image}
              user={blog.user.name} />
           </div>
        })
      }
    </div>
  )
}

export default Blogs
