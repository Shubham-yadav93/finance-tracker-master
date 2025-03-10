const Transaction = require('../models/Transaction');

const addTransaction = async (req, res) => {
  const { type, amount, description } = req.body;
  try {
    const newTransaction = new Transaction({ userId: req.user.id, type, amount, description });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
    if (transaction.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await transaction.remove();
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { addTransaction, getTransactions, deleteTransaction };