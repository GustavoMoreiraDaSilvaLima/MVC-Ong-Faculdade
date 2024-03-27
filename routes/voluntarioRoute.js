const express = require('express');
const VoluntarioController = require('../controllers/voluntarioController');

const router = express.Router();
let ctrl = new VoluntarioController();

router.get("/");

module.exports = router;