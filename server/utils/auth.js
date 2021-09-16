const jwt = require('jsonwebtoken');
const config = require('../config');
const roles = require('./roles');


function getTokenFromHeader(req) {
  let token = null;

  // Get the auth header as array with 0th elementh the type of authorization
  // and the 1-st element the authorization value
  // ['Token', '<token-value>']
  const authHeader = req.header('Authorization') ? req.header('Authorization').split(' ') : [];

  if (authHeader.length !== 0 && authHeader[0] === 'Token') {
    token = authHeader[1];
  }

  return token;
}

function getDecodedToken(req) {
  const TOKEN = getTokenFromHeader(req);
  console.log('TOKEN: ', TOKEN);

  if (!TOKEN) {
    return null;
  }

  let decodedToken = null;

  try {
    decodedToken = jwt.verify(TOKEN, config.JWT_SECRET);
    console.log('decoded token:', decodedToken);
  } catch(error) {
    console.log(error.message);
  }

  return decodedToken;
}

module.exports.asAdmin = (req, res, next) => {
  console.log('Auth as Admin');

  const decodedToken = getDecodedToken(req);

  if (!decodedToken) {
    res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
    return;
  }

  if (decodedToken.role !== roles.ADMIN) {
    res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
    return;
  }

  req.account = decodedToken;

  next();
};

module.exports.asDentist = (req, res, next) => {
  console.log('Auth as Dentist');

  const decodedToken = getDecodedToken(req);

  if (!decodedToken) {
    res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
    return;
  }

  if (decodedToken.role !== roles.DENTIST) {
    res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
    return;
  }

  req.account = decodedToken;

  next();
};

module.exports.asPatient = (req, res, next) => {
  console.log('Auth as Patient');

  const decodedToken = getDecodedToken(req);

  if (!decodedToken) {
    res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
    return;
  }

  if (decodedToken.role !== roles.PATIENT) {
    res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
    return;
  }

  req.account = decodedToken;

  next();
};

module.exports.asAll = (req, res, next) => {
  console.log('Auth as Patient');

  const decodedToken = getDecodedToken(req);
  console.log('decoded token in asAll:', decodedToken);

  if (!decodedToken) {
    res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
    return;
  }

  // IF not admin nor dentist nor patient
  if (
    decodedToken.role !== roles.PATIENT
    && decodedToken.role !== roles.DENTIST
    && decodedToken.role !== roles.ADMIN
  ) {
    res.status(401).json({ status: 'error', statusmsg: 'Invalid auth token' });
    return;
  }

  req.account = decodedToken;

  next();
};

