const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function updateLastReq(req) {
    const { headers, body, params, query, route, ip, protocol, secure } = req;
    req.app.locals.lastReq = {
        headers, body, params, query, route, ip, protocol, secure
    };
}

function sanitize(str) {
    return str.replace(/<(\/)*script>/gi,'[nice try]').replace(/<|>/gi, '');
}

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.get('/guestbook', (req, res) => {
    updateLastReq(req);
    const { query } = req;
    if (!(Object.keys(query).length === 0 && query.constructor === Object)) {
        const result = req.app.locals.data.filter(d => d.id == query.id);
        return res.send(result.length ? result : {error: 'not found'});
    }
    res.send(req.app.locals.data);
});


router.get('/last-request', (req, res) => {
    res.send(req.app.locals.lastReq);
});

router.post('/guestbook/new', (req, res) => {
    const { data } = req.app.locals;
    const id = data.length ? data[data.length - 1].id + 1 : 0;
    const name = sanitize(req.body.name);
    const message = sanitize(req.body.message);
    req.app.locals.data.push({ id, name, message });
    updateLastReq(req);
    res.status(200).send();
});

router.delete('/guestbook/:id', (req, res) => {
    updateLastReq(req);
    const { id } = req.params;
    if (id == 'all') {
        req.app.locals.data = [];
        res.status(200).send();
    } else {
        req.app.locals.data = req.app.locals.data.filter(d => d.id != id);
        res.status(200).send();
    }
});

module.exports = router;