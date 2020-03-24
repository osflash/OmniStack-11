const connection = require('../database');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ongId')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async create(req, res) {
    const { title, description, value } = req.body;
    const { authorization: ongId } = req.headers;

    const ong = await connection('ongs')
      .where('id', ongId)
      .first();

    if (!ong) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ongId,
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const { authorization: ongId } = req.headers;

    const ong = await connection('ongs')
      .where('id', ongId)
      .select('id')
      .first();

    const incident = await connection('incidents')
      .where('id', id)
      .select('ongId')
      .first();

    if (!ong || !incident || incident.ongId !== ong.id) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    console.log(ong, incident);


    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  },
};
