import { User } from "../model/users/user.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { sendVerificationEmail } from "../utils/sendMail.js"; // Import email function
import { generateToken } from "../utils/token.js";
//create user account
export const signUp = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        if (!email || !name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!validator.isStrongPassword(password, { 
            minLength: 6, 
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1, 
            minSymbols: 1 
        })) {
            return res.status(400).json({ 
                message: "Password must be at least 6 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character." 
            });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists, register with another email" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit token
        const verificationExpires = Date.now() + 1 * 60 * 60 * 1000;

        const user = new User({
            name,
            email,
            password: hashPassword,
            verificationToken,
            verificationTokenExpiresAt: verificationExpires
        });

        await user.save();

        // Send only the verification token via email
        await sendVerificationEmail(email, verificationToken);

        
        return res.status(201).json({ 
            message: "User successfully created. Check your email for the verification token.", 
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
//verify account
export const verifyAccount = async (req, res) => {
    const { verificationToken } = req.body;

    try {
        // Find user with the provided token
        const user = await User.findOne({ verificationToken });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        // Check if token has expired
        if (user.verificationTokenExpiresAt < Date.now()) {
            return res.status(400).json({ message: "Verification token has expired. Request a new one." });
        }

        // Mark user as verified
        user.isVerified = true;
        user.verificationToken = ""; // Clear token after successful verification
        user.verificationTokenExpiresAt = null; // Optional: Clear expiration time
        await user.save();

        return res.status(200).json({ message: "Account verified successfully" });

    } catch (error) {
        console.error("Error verifying account:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//Login

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate and set token
        generateToken(res, user._id);

        // Send user details (excluding password)
        return res.status(200).json({
            message: "Login successful", user});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
