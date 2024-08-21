import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
