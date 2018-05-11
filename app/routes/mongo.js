var express = require('express'),
    router = express.Router(),
    mongoController = require('../controllers/mongoController');

// Test mongo connection
router.get('/', mongoController.connect);
router.get('/get/presupuesto/', mongoController.get);
router.get('/get/gasto/',mongoController.getGasto);
router.post('/insert/presupuesto/', mongoController.insert);

module.exports = router;
