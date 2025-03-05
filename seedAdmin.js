import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './model/users/user.js'; 
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB...");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

// Create an Admin user and save it to the database
const createAdmin = async () => {
    try {
        // Check if Admin already exists to avoid duplication
        const adminExists = await User.findOne({ email: "elijahfx43@gmail.com"});
        if (adminExists) {
            console.log('Admin user already exists.');
            return;
        }

        // Admin user details
        const adminUser = new User({
            name: 'Elijah Peter',
            email: 'elijahfx43@gmail.com',
            password: await bcrypt.hash('1234567890Pe*', 10), 
            role: 'Admin', 
            isVerified: true,
        });

        // Save the admin user to the database
        await adminUser.save();
        console.log('Admin user created successfully.');
        mongoose.connection.close(); 
    } catch (error) {
        console.error('Error creating Admin user:', error);
        mongoose.connection.close();
    }
};

// Run the function to create the admin
createAdmin();
