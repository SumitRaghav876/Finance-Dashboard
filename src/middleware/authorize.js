
const authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                msg: `Access denied! Only ${roles.join(', ')} can access this!`
            });
        }
        next();
    };
};

export default authorize;