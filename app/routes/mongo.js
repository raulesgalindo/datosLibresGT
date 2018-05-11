var express = require('express'),
    router = express.Router(),
    mongoController = require('../controllers/mongoController');

router.get('/get/presupuesto/', mongoController.get);
router.get('/get/gasto/',mongoController.getGasto);


module.exports = router;
