const errorHandler=(err,req,res,next)=>{
    let statusCode=err.statusCode||500;
    let message=err.message || 'Somthing Went Wrong!';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(e => e.message).join(', ');
    }

    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token!';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired!';
    }

    res.status(statusCode).json({
        success:false,
        message
    });
};
export default errorHandler;