if (process.env.BUILD_ENV == 'production') {
    module.exports = require('./production.js');
}
else {
    module.exports = require('./development.js');
}