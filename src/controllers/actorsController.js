const db = require('../database/models');

const actorsController = {
    list: async function  (req, res) {
        try {
            const actors = await db.Actor.findAll()
            res.render('actorsList', {actors})
        } catch (error) {
            res.send(error)   
        }

},
    detail: async function (req, res) {
        try {
            const actor = await db.Actor.findByPk(req.params.id);
            res.render ('actorDetail', {actor})
            
        } catch (error) {
            res.send (error)
        }
    }
}
module.exports = actorsController;