import React from 'react'
import {Box,Container, Grid, Typography, InputLabel,TextField,Button } from '@mui/material'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddBlog = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = React.useState({
    title: '',
    description: '',
    image: ''
  })

  const sendRequest = async () => {
    const res = await axios.post('http://localhost:5000/api/blog/add', {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: localStorage.getItem('userId')
    })

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
    sendRequest().then(() => navigate('/blogs'))
  }
  const labelStyle = {mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}
  return (
    <Box>
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
                <Grid item xs={12}>
                    <InputLabel sx={labelStyle}>Image</InputLabel>
                    <TextField name='image' value={inputs.image} onChange={handleChange} sx={{width:'100%'}}/>
                </Grid>
            
          </Grid>
          <Box display='flex' justifyContent='center' mt={4}>
            <Button variant='contained' sx={{width:'300px'}} type='submit'>submit</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default AddBlog
