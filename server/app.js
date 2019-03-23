require('dotenv').config({ path: __dirname + './../.env'});
require('./db/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const hbs = require('hbs');
const app = express();

app.set('view engine', hbs);
app.set('views', path.join(`${ __dirname }/views`));

app.use(express.static(path.join(`${ __dirname }/../public`)));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

hbs.registerPartials(path.join(`${ __dirname }/views/partials`));
hbs.registerHelper('copyrightYear', () => new Date().getFullYear());

app.use(require('./routes'));

app.listen(process.env.PORT, () => console.log('Server is up!'));