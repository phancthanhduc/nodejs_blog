const Course = require('../models/courses');

class NewsController {
    //[GET] /news
    index(req, res, next) {
        //     Course.find({}, function(err, courses){
        //         if(!err) {
        //             res.json(courses)
        //         } else {
        //             res.status(400).json({error: "ERROR!!!"})
        //         }
        //     })
        Course.find({})
            .then((courses) => res.render('news'))
            .catch(next);
    }

    //[GET] /news/:slug
    show(req, res) {
        res.send('Hello anh em');
    }
}

module.exports = new NewsController();
