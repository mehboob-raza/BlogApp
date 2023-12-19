import axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Grid, Typography, InputLabel, TextField, Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'


const BlogDetails = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState()
  const [inputs, setInputs] = React.useState({
     title: '',
    description: '',
    image: ''
   })
  
  
  const id = useParams().id
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`)
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }
  // console.log(blogs);

  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
    }).catch(err => console.log(err))

    const data =await res.data
    return data
  }

   const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev, 
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs, 'input');
    sendRequest().then(data => console.log(data))
      .then(() => navigate('/myBlogs'))
    
  }
  useEffect(() => {
    fetchDetails().then(data => {
      setBlogs(data.blog)
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      })
    })

  }, [id])
 

  const labelStyle = {mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}


  return (
    <div>
      {
        inputs &&
        <Container component="main" maxWidth="md">
        <Box component="form" onSubmit={handleSubmit} sx={{
              borderRadius: 10,
              boxShadow: '10px 10px 20px #ccc',
              borderColor: 'green',
              border: 3,
              p: 3,
              m: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
        }}>
              <Typography variant='h3' sx={{fontWeight:'bold'}}>Post Your Blog</Typography>
          
              <Grid container spacing={3}>
                <Grid item xs={12}>
                    <InputLabel sx={labelStyle}>Title</InputLabel>
                    <TextField name='title' value={inputs.title} onChange={handleChange} sx={{width:'100%'}} />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel sx={labelStyle}>Description</InputLabel>
                    <TextField name='description' value={inputs.description} onChange={handleChange} sx={{width:'100%'}}/>
                </Grid>
                
            
          </Grid>
          <Box display='flex' justifyContent='center' mt={4}>
            <Button variant='contained' sx={{width:'300px'}} type='submit'>submit</Button>
          </Box>
        </Box>
      </Container>
      }
    </div>
  )
}

export default BlogDetails
