var express = require('express'),
    router = express.Router(),
    mongoController = require('../controllers/mongoController');

// Test mongo connection
router.get('/', mongoController.connect);

router.post('/insert/presupuesto/', mongoController.insert);

module.exports = router;
