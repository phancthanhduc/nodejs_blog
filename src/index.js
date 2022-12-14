const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3000;
const routes = require('./routes');
const db = require('./config/db');
const SortMiddleware = require('./app/middleware/SortMiddleware');
//use static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Custom middleware
app.use(SortMiddleware);
//Http logger
// app.use(morgan('combined'))

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'bi bi-filter-square',
                    asc: 'bi bi-sort-alpha-down',
                    desc: 'bi bi-sort-alpha-up',
                };

                const types = {
                    default: 'asc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
            </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Connect to db
db.connect();
// app.get('/', (req, res) => {
//   res.render('home')
// })

// app.get('/search', (req, res) => {
//   res.render('search')
// })

// app.post('/search', (req, res) => {
//   console.log(req.body)
//   res.render('search')
// })
routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
