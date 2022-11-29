const { Router } = require('express');
const router = Router();
const verifyToken = require('../middleware/authenticate');


// router.use(require('./Auth.js'));
router.use(require('./user'))
router.use(require('./product.js'));
// router.use(require('./Bills.js'));
// router.use(require('./Orders.js'));
// router.use(require('./Reviews.js'));

module.exports = router;
