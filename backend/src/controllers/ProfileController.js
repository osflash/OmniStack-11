const connection = require('../database');

module.exports = {
  async index(req, res) {
    const ongId = req.headers.authorization;

    const ong = await connection('ongs')
      .where('id', ongId)
      .select('id')
      .first();

    if (!ong) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const incidents = await connection('incidents')
      .where('ongId', ong.id)
      .select('*');

    return res.json(incidents);
  },
};
