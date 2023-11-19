const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'تم الرفض' });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'توكن غير صالح' });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
