const db = require ('../database/models');

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
                ['rating', 'DESC']
              ]
         })
            .then(movies => {
                res.render ('recommendedMovies', {movies})
            })
    },
    add: (req, res) => {
        res.render('moviesAdd')
    },
    create: async function (req, res) {
        try {
            await db.Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length
            })
            res.redirect('/movies');
        } catch (error) {
            res.send(error)
        }
    },
    edit: async function (req, res) {
        try {
            const Movie = await db.Movie.findByPk(req.params.id);
            res.render('moviesEdit', {Movie});

        } catch (error) {
            res.send(error)
        }
    },
    update: async function (req,res) {
        try {
            await db.Movie.update({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length
            },{
                where: {id: req.params.id}
            })
            res.redirect('/movies');
            
        } catch (error) {
            res.send(error)
        }
    },
    delete: async function (req, res) {
        try {
            const Movie = await db.Movie.findByPk(req.params.id);
            res.render('moviesDelete', {Movie});
            
        } catch (error) {
            res.send(error)
        }
    },
    destroy: async function (req, res) {
        try {
            await db.Movie.destroy({
                where: {id: req.params.id}
             });
            res.redirect('/movies');
             
            
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = moviesController;