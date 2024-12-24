const asyncHandler = require('express-async-handler');
const contactsModel = require('../models/contactModel');
const {constants} = require("../constants");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await contactsModel.find({userId: req.user.id});
    res.status(200).json({message: 'All Contacts Get', contacts});
});

//@desc Create a Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields Mandatory!');
    }
    const contact = await contactsModel.create({
        name, email, phone,
        userId: req.user.id
    });
    res.status(201).json(contact);
})

//@desc Get Specific Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await contactsModel.findById(id).find({userId: req.user.id});
    if (!contact) {
        res.status(404);
        throw new Error('No Contact Found.');

    }
    res.status(200).json(contact);
})

//@desc Update a contact
//@route PUT /api/contacts
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await contactsModel.findById(id);
    if (!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error('No Contact Found.');
    }
    if (contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Permission Denied!');
    }
    const updatedContact = await contactsModel.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json(updatedContact);
})

//@desc Delete a specific contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await contactsModel.findById(id);
    if (!contact) {
        res.status(constants.NOT_FOUND);
        throw new Error('No Contact Found.');
    }

    if (contact.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Permission Denied!');
    }

    const deleteContact = await contactsModel.findByIdAndDelete(id);
    res.status(200).json(deleteContact);

})


module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};