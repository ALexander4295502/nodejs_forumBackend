var router = require('express').Router();

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/articles', require('./articles'));
router.use('/tags', require('./tags'));
router.use('/viewcount', require('./pageViewCounts'));
router.use('/contact', require('./contactEmail'));

router.use(function (err, req, res, next) {
    if(err.name === 'ValidationError'){
        console.log("validationError!");
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function (errors, key) {
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        });
    }

    return next(err);
});



module.exports = router;
