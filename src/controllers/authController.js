import * as authService from "../services/authService.js";

export const register=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const result=await authService.register({name,email,password,role});
        res.status(201).json({success:true,data:result});
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
}; 