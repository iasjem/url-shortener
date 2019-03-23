const express = require('express');
const validator = require('validator');
const shortid = require('shortid');
const { URL } = require('../model/URL');
const router = express.Router();

router.route('/')
    .get((req, res) => res.render('index.hbs'))
    .post(async (req, res) => {
        let originalURL = req.body.url;

        if (!validator.isURL(originalURL)) return res.status(400).render('400.hbs');

        await URL.findOneAndDelete({ "original_url": originalURL });

        const code = shortid.generate();

        let urlJSON = new URL({ 
            "_id": code,
            "original_url": originalURL, 
            "short_url": `${req.headers.host}/${code}`
        });

        await urlJSON.save((err, url) => {
            if (err) return res.status(404).render('404.hbs');
            res.render('success.hbs', { code: url['_id'], shortURL: url['short_url'] });
        });  
    });

router.get('/:code', async (req, res) => {
    const url = await URL.findOne({ "_id": req.params.code });
    if (!url) return res.status(404).render('404.hbs');
    if (!validator.isURL(url['original_url'])) return res.status(400).render('400.hbs');
    res.redirect(url['original_url']);
});

module.exports = router;