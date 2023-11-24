const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.post('/', postsController.store);
router.get('/:slug', postsController.show);
router.get('/', postsController.index);
router.put('/:slug', postsController.update);
router.delete('/:slug', postsController.destroy);

module.exports = router;