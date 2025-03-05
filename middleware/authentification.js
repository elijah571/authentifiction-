import jwt from 'jsonwebtoken';
import { User } from '../model/users/user.js';

// Middleware to check if user is authenticated
export const isAuthenticateUser = async (req, res, next) => {
    let token;

    // Check if the token is provided in the cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }

        try {
            // Verify the token using jwt.verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log('Decoded Token:', decoded); // Log decoded token to check the payload

            // Retrieve the user from the database using the userId from the decoded token
            const user = await User.findById(decoded.userId);

            console.log('User found:', user);  // Log the user retrieved from the database

            if (!user) {
                return res.status(404).json({ message: "User authentication not found" });
            }

            // Attach the user object to the request so other middlewares can access it
            req.user = user;

            next();  // Proceed to the next middleware
        } catch (error) {
            console.error('JWT Error:', error); // Log JWT errors for debugging
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ message: "Authorization token is missing" });
    }
};


// Admin has full access to everything, including Shipper routes
export const isAdmin = async (req, res, next) => {
    const user = req.user;  // User object attached by isAuthenticateUser

    if (!user) {
        return res.status(403).json({ message: "User is not authenticated" });
    }

    if (user.role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to access this resource" });
    }

    next(); // Proceed to the next middleware/handler
};

//  Only allow Shippers access and admin
export const isShipper = async (req, res, next) => {
    const user = req.user;

    if (user.role !== "Shipper" && user.role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to access this resource" });
    }

    next();  // Proceed to the next middleware/handler
};

//  Only allow Carriers access and  Admins access
export const isCarrier = async (req, res, next) => {
    const user = req.user;

    if (user.role !== "Carrier" && user.role !== "Admin") {
        return res.status(403).json({ message: "You do not have permission to access this resource" });
    }

    next();  // Proceed to the next middleware/handler
};
