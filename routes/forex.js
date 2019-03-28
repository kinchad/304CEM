module.exports = function(app){
    var strain = require('../controllers/Strain')
    var siteRoot = require('../routes/root');

    // Site Index
    app.use('/', siteRoot);

    // Strains
    app.route('/strains').get(strain.getAllItems)
}