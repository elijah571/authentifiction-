import { User } from "../model/users/user.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { sendVerificationEmail } from "../utils/sendMail.js"; // Import email function

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
