const express = require('express');
const AdminController = require('../controllers/adminController');

const router = express.Router();
let ctrl = new AdminController();

router.get("/");

module.exports = router;