const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({"status": "error", "error": 'Invalid request!'});
  }

  res.status(201).send('registered successfully');
};

module.exports.login = function (req, res) {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).send({"status": "error", "error": 'Invalid request!'});
  }

  // Database check
  if (email !== 'admin@admin') {
    return res.status(400).send({"status": 'error', "error": 'Invalid email or password!'});
  }

  // Everything is ok, generate token
  const tokenPayload = {
    "email": email,
  };
  const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET);

  res.json({"status": 'success', "message": 'Successfully authorized!', "token": token});
};
