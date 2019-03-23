const express = require('express');
const validator = require('validator');
const shortid = require('shortid');
const router = express.Router();
const { URL } = require('../model/URL');

router.get('/', (req, res) => res.render('index.hbs'));

router.get('/:code', async (req, res) => {
    const url = await URL.findOne({ "_id": req.params.code });
    if (!url) res.status(404).render('404.hbs');
    if (!validator.isURL(url['original_url'])) res.status(400).render('400.hbs');
    res.redirect(url["original_url"]);
});

router.post('/api/shorturl/new', async (req, res) => {
    const baseURL = req.headers.host;
    let originalURL = req.body.url;

    if (!validator.isURL(originalURL)) return res.status(400).render('400.hbs');

    const urlCode = `/${shortid.generate()}`;
    const url = await URL.findOne({ "original_url": originalURL });
    if (url) return res.render('success.hbs', { shortURL: url['short_url'] });
    
    let urlJSON = new URL({ 
        "_id": urlCode,
        "original_url": originalURL, 
        "short_url": baseURL + urlCode
    });

    await urlJSON.save((err, url) => {
        if (err) return res.status(404).render('404.hbs');
        res.render('success.hbs', { shortURL: url['short_url'] });
    });  
});

  module.exports = router;