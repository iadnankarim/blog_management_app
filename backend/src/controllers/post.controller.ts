import { Request, Response } from 'express';
import Post from '../models/Post.model';

// @desc    Get all posts (Public)
// @route   GET /api/posts
// @access  Public
export const getAllPosts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email') // Include author details
      .sort({ createdAt: -1 }); // Latest posts first

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error: any) {
    console.error('Get all posts error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching posts',
    });
  }
};

// @desc    Get single post by ID (Public)
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'name email'
    );

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    console.error('Get post by ID error:', error);

    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching post',
    });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private (Authenticated users only)
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      res.status(400).json({
        success: false,
        message: 'Please provide title and content',
      });
      return;
    }

    // Create post with logged-in user as author
    const post = await Post.create({
      title,
      content,
      author: req.user!.id, // req.user is set by auth middleware
    });

    // Populate author details for response
    const populatedPost = await Post.findById(post._id).populate(
      'author',
      'name email'
    );

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: populatedPost,
    });
  } catch (error: any) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating post',
    });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private (Only post owner)
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body;

    // Find post
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    // Check ownership - Only author can update
    if (post.author.toString() !== req.user!.id) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      });
      return;
    }

    // Update post
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    // Populate author details for response
    const updatedPost = await Post.findById(post._id).populate(
      'author',
      'name email'
    );

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error: any) {
    console.error('Update post error:', error);

    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error updating post',
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private (Only post owner)
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    // Check ownership - Only author can delete
    if (post.author.toString() !== req.user!.id) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
      return;
    }

    // Delete post
    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: {},
    });
  } catch (error: any) {
    console.error('Delete post error:', error);

    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting post',
    });
  }
};
