const mongoose = require('mongoose');
const {constants} = require('../constants');

const validateObjectId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(constants.VALIDATION_ERROR);
        next({message: 'Invalid id for contact! Please enter a valid id!'})
    } else {
        next();
    }
};

module.exports = validateObjectId;