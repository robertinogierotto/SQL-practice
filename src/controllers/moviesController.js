const db = require ('../database/models');
const sequelize = db.sequelize; //no se para que es

const moviesController = {
    'list': async (req, res) => {
       /* db.Movie.findAll()
            .then (movies => {
                res.render ('moviesList', {movies})
            }).catch ()*/
        try {
            const movies = await db.Movie.findAll();
            res.render ('moviesList', {movies})
            
        } catch (error) {
            res.send (error);
            
        }
    },
    /* 'detail': async (req, res) => {
        try {
            const movie = await db.Movie.findByPk(req.params.id)
            res.render ('moviesDetail', {movie})

        } catch (error) {
            res.send (error)
        }
    } */
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render ('moviesDetail', {movie})
            })
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order: [
            ['release_date', 'DESC']
          ],limit: 5
         })
            .then(movies => {
                res.render ('newestMovies', {movies})
            })
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {rating: {[db.Sequelize.Op.gte]: 8}},
            order: [
                ['release_date', 'DESC']
              ]
         })
            .then(movies => {
                res.render ('recommendedMovies', {movies})
            })
    }

}

module.exports = moviesController;