const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ "status": "error", "error": 'Invalid request!' });
  }

  res.status(201).send('registered successfully');
};

module.exports.login = function (req, res) {
  const { email, password } = req.body;

  const findAdminQuery = 'select email,password from account where email=$1 and role_id=1';
  const findAccountValues = [email];

  let foundAccount = null;
  try {
    const foundAccountResult = await db.query(findAdminQuery, findAccountValues);
    foundAccount = foundAccountResult.rows[0];

    if (foundAccountResult.rows.length === 0) {
      return res.status(400).json({ status: 'error', statusmsg: 'Invalid email or password!' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Internal error!' });
  }

  // Validate password
  try {
    const passwordsMatch = await bcrypt.compare(password, foundAccount.password);
    if (!passwordsMatch) {
      return res.status(400).json({ status: 'error', statusmsg: 'Invalid email or password!' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', statusmsg: 'Internal error!' });
  }

  const tokenPayload = {
    id: foundAccount.id,
    email: foundAccount.email,
  };
  const token = jwt.sign(tokenPayload, config.JWT_SECRET, { expiresIn: '8h' });
  res.json({ status: 'success', statusmsg: '', token: token });
};
