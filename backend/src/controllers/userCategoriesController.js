const pool = require("../db/db");

exports.getUserCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(
      "SELECT * FROM categories WHERE user_id = ?",
      [req.user.id]
    );
    res.json(categories);
  } catch (error) {
    console.error("Błąd podczas pobierania kategorii użytkownika:", error);
    res.status(500).json({ message: "Nie udało się pobrać kategorii." });
  }
};

exports.getUserCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const [category] = await pool.query(
      `SELECT id, name, description 
      FROM categories 
      WHERE user_id = ? AND id = ?`,
      [req.user.id, id]
    );

    if (category.length === 0) {
      return res.status(404).json({ message: "Kategoria o podanym ID nie została znaleziona." });
    }

    res.json(category[0]);
  } catch (error) {
    console.error("Błąd podczas pobierania kategorii użytkownika:", error);
    res.status(500).json({ message: "Nie udało się pobrać kategorii." });
  }
};

exports.addUserCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nazwa kategorii jest wymagana." });
  }

  try {
    const [existing] = await pool.query(
      "SELECT * FROM categories WHERE name = ? AND user_id = ?",
      [name, req.user.id]
    );

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Kategoria o tej nazwie już istnieje." });
    }

    const [result] = await pool.query(
      "INSERT INTO categories (name, description, user_id) VALUES (?, ?, ?)",
      [name, description || null, req.user.id]
    );

    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    console.error("Błąd podczas dodawania kategorii użytkownika:", error);
    res.status(500).json({ message: "Nie udało się dodać kategorii." });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nazwa kategorii jest wymagana." });
  }

  try {
    const [category] = await pool.query(
      "SELECT id FROM categories WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );

    if (category.length === 0) {
      return res.status(404).json({ message: "Kategoria nie została znaleziona." });
    }

    await pool.query(
      "UPDATE categories SET name = ?, description = ? WHERE id = ? AND user_id = ?",
      [name, description || null, id, req.user.id]
    );

    res.status(200).json({ message: "Kategoria została zaktualizowana." });
  } catch (error) {
    console.error("Błąd podczas aktualizacji kategorii:", error);
    res.status(500).json({ message: "Nie udało się zaktualizować kategorii." });
  }
};

exports.reassignExpenses = async (req, res) => {
  const oldCategoryId = req.params.id;
  const { newCategoryId } = req.body;

  console.log("Rozpoczęcie przenoszenia wydatków...");
  console.log("Stara kategoria ID:", oldCategoryId);
  console.log("Nowa kategoria ID:", newCategoryId);

  if (!newCategoryId) {
    return res.status(400).json({ message: "Nowa kategoria jest wymagana." });
  }

  try {
    const [targetCategory] = await pool.query(
      "SELECT id FROM categories WHERE id = ? AND user_id = ?",
      [newCategoryId, req.user.id]
    );

    if (!targetCategory.length) {
      return res.status(400).json({ message: "Nieprawidłowe ID nowej kategorii." });
    }

    await pool.query(
      "UPDATE expenses SET category_id = ? WHERE category_id = ? AND user_id = ?",
      [newCategoryId, oldCategoryId, req.user.id]
    );

    res.status(200).json({ message: "Wydatki zostały przeniesione." });
  } catch (error) {
    console.error("Błąd podczas przenoszenia wydatków:", error);
    res.status(500).json({ message: "Nie udało się przenieść wydatków." });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const [expenses] = await pool.query(
      "SELECT id FROM expenses WHERE category_id = ? AND user_id = ?",
      [id, req.user.id]
    );

    if (expenses.length > 0) {
      return res
        .status(400)
        .json({ message: "Nie można usunąć kategorii, która jest przypisana do wydatków." });
    }

    await pool.query("DELETE FROM categories WHERE id = ? AND user_id = ?", [id, req.user.id]);

    res.status(200).json({ message: "Kategoria została usunięta." });
  } catch (error) {
    console.error("Błąd podczas usuwania kategorii:", error);
    res.status(500).json({ message: "Nie udało się usunąć kategorii." });
  }
};

exports.getExpensesByCategoryId = async (req, res) => {
  const { id } = req.params;

  try {
    const [expenses] = await pool.query(
      "SELECT * FROM expenses WHERE category_id = ? AND user_id = ?",
      [id, req.user.id]
    );

    if (expenses.length === 0) {
      return res.status(200).json({ message: "Brak wydatków przypisanych do tej kategorii." });
    }

    res.json(expenses);
  } catch (error) {
    console.error("Błąd podczas pobierania wydatków dla kategorii:", error);
    res.status(500).json({ message: "Nie udało się pobrać wydatków." });
  }
};
