const Course = require('../models/courses');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        let coursesQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            coursesQuery = coursesQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([coursesQuery, Course.countDocumentsDeleted()]).then(
            ([courses, countDeletedDocuments]) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                    countDeletedDocuments,
                }),
        );
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted().then((courses) =>
            res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses),
            }),
        );
    }
}

module.exports = new MeController();
