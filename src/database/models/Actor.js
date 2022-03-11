module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        first_name: {
            type: dataTypes.STRING(100)
        },
        last_name: {
            type: dataTypes.STRING(100)
        },
        rating: {
            type: dataTypes.DECIMAL(3,1)
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'actors',
        timestamps: false
    };
    const Actor = sequelize.define(alias, cols, config)
    return Actor
}