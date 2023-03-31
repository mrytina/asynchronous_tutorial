const router = require('express').Router();

module.exports = (app) => {
    router.get('/api/first', (_req, res) => {
        console.log('/api/first');
        res.json({data: `Request made at ${new Date().toISOString()} to /api/first`});
    });

    router.post('/api/second', (req, res) => {
        console.log('/api/second');
        res.json({data: `Request made at ${new Date().toISOString()} to /api/second you send ${req.body.payload}`});
    });

    router.get('/*', (_req, res) => {
        res.render('index');
    });

    app.use('/', router);
};