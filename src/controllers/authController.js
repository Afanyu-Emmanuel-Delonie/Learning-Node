import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokens.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if the user already exists
  const userExists = await prisma.User.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }

  // Hash user password (before saving to database)
  // we are going to use the bcryptjs library for hashing passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  try {
    const user = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// login functionality
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists with this email
    const user = await prisma.User.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // generate tokens 
    const token = generateToken(user.id, res);

    // Return user info (without password)
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token: token
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


//logout functionality 
const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({
        status: "success",
        message: "User logged out successfully"
    })
};


export { register, login, logout };
