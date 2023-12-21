import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {serverUrl} from '../App'


export default function BlogCard({title, description, imageUrl, user, isUser, id}) {
  const navigate = useNavigate()
    // console.log(title, isUser);
  const handleEdit = (e) => {
   navigate(`/myBlogs/${id}`) 
  }


  const deleteRequest = async() => {
    const res = await axios.delete(`${serverUrl}/api/blog/${id}`).catch(err => console.log(err))
    const data = res.data
    return data
  }
  const handleDelete = async () => {
    deleteRequest().then(() => navigate('/')).then(() => navigate('/blogs'))
  }
  return (
      <Card sx={{
          width: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', ":hover": {
        boxShadow: '10px 10px 20px #ccc'
          }
      }}>
          {
              isUser &&
                <Box display='flex' alignItems='flex-end'>
                    <IconButton onClick={handleEdit}> <EditIcon color='warning' />  </IconButton>
                    <IconButton onClick={handleDelete}> <DeleteIcon color='error' />  </IconButton>
                </Box>
          }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {user && user.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt="Paella dish"
      />
      {/* <img id="image-preview" alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} /> */}

      <br />
      <hr></hr>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         <b>{user}</b> : {description}
        </Typography>
      </CardContent>
      
    </Card>
  );
}
