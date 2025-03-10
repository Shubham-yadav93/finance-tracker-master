const express = require('express');
const router = express.Router();
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.post('/', auth, addTransaction);
router.get('/', auth, getTransactions);
router.delete('/:id', auth, deleteTransaction);

module.exports = router;