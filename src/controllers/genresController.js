const db = require('../database/models');

const genresController = {
    list: async function  (req, res) {
        try {
            const genres = await db.Genre.findAll()
            res.render('genresList', {genres})
        } catch (error) {
            res.send(error)   
        }

},
    detail: async function (req, res) {
        try {
            const genre = await db.Genre.findByPk(req.params.id);
            res.render ('genresDetail', {genre})
            
        } catch (error) {
            res.send (error)
        }
    }
}
module.exports = genresController;