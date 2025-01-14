import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { generateToken } from '../utils/jwtUtils';

// Sign up logic
export const signUpUser = async (req: Request, res: Response) => {
  const { username, password, email, phone, role, isActive } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User();
    newUser.username = username;
    newUser.password = hashedPassword; // Save the hashed password
    newUser.email = email;
    newUser.role = role;
    newUser.isActive = isActive;
    newUser.phone = phone;

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({
      message: 'User registered successfully!',
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login logic
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = generateToken(user.id, user.username, user.role);

    // Respond with token and user info (without password)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
