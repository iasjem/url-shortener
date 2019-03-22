const express = require('express');
const validator = require('validator');
const shortid = require('shortid');
const router = express.Router();
const { URL } = require('../model/URL');

router.get('/', (req, res) => res.render('index.hbs'));
router.get('/', (req, res) => res.render('404.hbs'));

router.get('/:code', async (req, res) => {
    const url = await URL.findOne({ "_id": req.params.code });
    if (!url) return res.json({"error":"invalid URL"})
    res.redirect(url["original_url"]);
});

router.post('/api/shorturl/new', async (req, res) => {
    const baseURL = 'http://localhost:8888/';
    let originalURL = req.body.url;

    if(!validator.isURL(originalURL)) return res.status(401).json({"error":"invalid URL"});

    const urlCode = shortid.generate();
    const url = await URL.findOne({ "original_url": originalURL });
    if(url) return res.status(200).json(url);
    
    let urlJSON = new URL({ 
    "_id": urlCode,
    "original_url": originalURL, 
    "short_url": baseURL + urlCode
    });

    await urlJSON.save((err, url) => {
        if(err) return res.json({"error": err});
        res.status(200).json(url);
    });  
});

  module.exports = router;