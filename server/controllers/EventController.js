const db = require('../utils/db');

module.exports.addGlobalEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    start,
    end
  } = req.body;

  const id = req.account.id;

  const createGlobalEvent = 'INSERT INTO global_events (dentist_id, title, description, event_date, event_start, event_end) VALUES($1, $2, $3, $4, $5, $6)';
  const values = [id, title, description, date, start, end];

  try {
    await db.query(createGlobalEvent, values);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      statusmsg: 'Internal server error!'
    });
  }

  return res.status(201).json({ status: 'success', statusmsg: 'Event added successfully!' });

};