const pool = require('../db/db');

exports.getExpenses = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT expenses.*, categories.name AS category_name 
      FROM expenses 
      LEFT JOIN categories ON expenses.category_id = categories.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).send('Failed to fetch expenses.');
  }
};

exports.getExpense = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT expenses.*, categories.name AS category_name 
      FROM expenses 
      LEFT JOIN categories ON expenses.category_id = categories.id
      WHERE expenses.id = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).send('Expense not found.');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).send('Failed to fetch expense.');
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { title, price, note, date, categoryId, userId } = req.body;

    if (!title || !price || !date || !categoryId || !userId) {
      return res.status(400).send('All required fields must be filled.');
    }

    const [result] = await pool.query(
      'INSERT INTO expenses (title, price, note, date, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, price, note || null, date, categoryId, userId]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).send('Failed to add expense.');
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { title, price, note, date, categoryId } = req.body;

    const [result] = await pool.query(
      'UPDATE expenses SET title = ?, price = ?, note = ?, date = ?, category_id = ? WHERE id = ?',
      [title, price, note || null, date, categoryId, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send('Expense not found.');
    }

    res.send('Expense updated successfully.');
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).send('Failed to update expense.');
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM expenses WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).send('Expense not found.');
    }

    res.send('Expense deleted successfully.');
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).send('Failed to delete expense.');
  }
};
