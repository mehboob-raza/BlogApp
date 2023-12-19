import Blog from "../models/Blog.js";
import User from "../models/User.js";
import mongoose  from "mongoose";

export const getAllBlogs = async(req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate('user')
    } catch (error) {
        console.log(error);
    }

    if (!blogs) {
        return res.status(404).json({message: 'No Blogs found'})
    }
    return res.status(200).json({blogs})
}

export const addBlog = async (req, res, next) => {
    const {title, description, image, user} = req.body
    let existinguser;
    try {
        existinguser = await User.findById(user)
    } catch (error) {
        return console.log(error);
    }
    if (!existinguser) {
        return res.status(404).json({ message: "Unable to find user by this id" })
    }
    const blog = await new Blog({
        title,
        description,
        image,
        user,
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({session})
        existinguser.blogs.push(blog)
        await existinguser.save({session})
        await session.commitTransaction()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }

    return res.status(200).json({blog})
}

export const updateBlog = async (req, res, next) => {
    const { title, description, image } = req.body
    const blogID = req.params.id
    console.log('blogID', blogID);
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogID, {
            title,
            description,
            image
    })
    } catch (error) {
        console.log(error);
    }

    if (!blog) {
        return res.status(500).json({message: 'unable to update blog'})
    }

    return res.status(200).json({blog})   
}


export const getById = async (req, res, next) => {
    const id = req.params.id

    let blog;
    try {
        blog = await Blog.findById(id)
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(404).json({message: 'Not Found'});
    }
    return res.status(200).json({ blog })
}

export const deleteBlog = async (req, res, next) => {
    const idRemove = req.params.id
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(idRemove).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: 'Unable to find and delete' });
    }
    return res.status(200).json({message:'Success Deleted'});
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id

    let userBlog;
    try {
        userBlog = await User.findById(userId).populate('blogs')
    } catch (error) {
     return console.log(error);   
    }

    if (!userBlog) {
        return res.status(404).json({message: 'No blog found'})
    }
    return res.status(200).json({user: userBlog})
}