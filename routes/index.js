const express = require('express');

/* GET home page. */
const db = require('../models');
const { temptab } = db;

const router = express.Router();



router.get('/', async (req, res, next) => {
  /**
     * render: Review all template
     * @return index page with Id and title as result
     */
  const temps = await temptab.findAll();
  res.render('template/index', { docs: temps });
});

router.get('/test', function (req, res, next) {
  res.status(200).json({ "msg": "success" });
});

module.exports = router;




