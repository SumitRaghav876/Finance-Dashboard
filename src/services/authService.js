import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async ({ name, email, password, role }) => {
        const existingUser=await User.findOne({email});
        if (existingUser) {
            throw new Error('User already exists!');
        }

        const user=await User.create({name,email,password,role});
        
        const token = signToken(user._id)   
        const userObj = user.toObject();
        delete userObj.password;
        
        return { token, user:userObj };

        
};

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = signToken(user._id);
    const userObj = user.toObject();
    delete userObj.password;

    return { token, user:userObj };
};
