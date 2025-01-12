const pool = require("../db/db");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query(
            "SELECT id, username, email, role, created_at FROM users"
        );
        res.json(users);
    } catch (error) {
        console.error("Błąd podczas pobierania użytkowników:", error);
        res.status(500).json({ message: "Nie udało się pobrać użytkowników." });
    }
};

exports.getUserDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const [user] = await pool.query(
            "SELECT id, username, email, role, created_at FROM users WHERE id = ?",
            [id]
        );

        if (!user.length) {
            return res.status(404).json({ message: "Użytkownik nie został znaleziony." });
        }

        res.json(user[0]);
    } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
        res.status(500).json({ message: "Nie udało się pobrać danych użytkownika." });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role, password } = req.body;

    try {
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                "UPDATE users SET username = ?, email = ?, role = ?, password = ? WHERE id = ?",
                [username, email, role, hashedPassword, id]
            );
        } else {
            await pool.query(
                "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?",
                [username, email, role, id]
            );
        }
        res.json({ message: "Dane użytkownika zaktualizowane pomyślnie." });
    } catch (error) {
        console.error("Błąd podczas aktualizacji użytkownika:", error);
        res.status(500).json({ message: "Nie udało się zaktualizować danych użytkownika." });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM users WHERE id = ?", [id]);
        res.json({ message: "Użytkownik został usunięty." });
    } catch (error) {
        console.error("Błąd podczas usuwania użytkownika:", error);
        res.status(500).json({ message: "Nie udało się usunąć użytkownika." });
    }
};

exports.getUserExpenses = async (req, res) => {
    const { id } = req.params;

    try {
        const [expenses] = await pool.query(
            `SELECT 
                e.id AS expense_id, 
                e.date,
                e.title, 
                e.price, 
                e.category_id, 
                c.name AS category_name
            FROM 
                expenses e
            LEFT JOIN 
                categories c ON e.category_id = c.id
            WHERE 
                e.user_id = ?;`,
            [id]
        );
        res.json(expenses);
    } catch (error) {
        console.error("Błąd podczas pobierania wydatków użytkownika:", error);
        res.status(500).json({ message: "Nie udało się pobrać wydatków użytkownika." });
    }
};

exports.updateUserExpense = async (req, res) => {
    const { expenseId } = req.params;
    const { title, price, note, date, category_id } = req.body;

    try {
        await pool.query(
            "UPDATE expenses SET title = ?, price = ?, note = ?, date = ?, category_id = ? WHERE id = ?",
            [title, price, note, date, category_id, expenseId]
        );
        res.json({ message: "Wydatek użytkownika zaktualizowany pomyślnie." });
    } catch (error) {
        console.error("Błąd podczas aktualizacji wydatku użytkownika:", error);
        res.status(500).json({ message: "Nie udało się zaktualizować wydatku użytkownika." });
    }
};

exports.deleteUserExpense = async (req, res) => {
    const { expenseId } = req.params;

    try {
        await pool.query("DELETE FROM expenses WHERE id = ?", [expenseId]);
        res.json({ message: "Wydatek użytkownika został usunięty." });
    } catch (error) {
        console.error("Błąd podczas usuwania wydatku użytkownika:", error);
        res.status(500).json({ message: "Nie udało się usunąć wydatku użytkownika." });
    }
};

exports.getUserCategories = async (req, res) => {
    const { id } = req.params;

    try {
        const [categories] = await pool.query(
            "SELECT * FROM categories WHERE user_id = ?",
            [id]
        );
        res.json(categories);
    } catch (error) {
        console.error("Błąd podczas pobierania kategorii użytkownika:", error);
        res.status(500).json({ message: "Nie udało się pobrać kategorii użytkownika." });
    }
};

exports.updateUserCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    try {
        await pool.query(
            "UPDATE categories SET name = ?, description = ? WHERE id = ?",
            [name, description, categoryId]
        );
        res.json({ message: "Kategoria użytkownika zaktualizowana pomyślnie." });
    } catch (error) {
        console.error("Błąd podczas aktualizacji kategorii użytkownika:", error);
        res.status(500).json({ message: "Nie udało się zaktualizować kategorii użytkownika." });
    }
};

exports.deleteUserCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        await pool.query("DELETE FROM categories WHERE id = ?", [categoryId]);
        res.json({ message: "Kategoria użytkownika została usunięta." });
    } catch (error) {
        console.error("Błąd podczas usuwania kategorii użytkownika:", error);
        res.status(500).json({ message: "Nie udało się usunąć kategorii użytkownika." });
    }
};

exports.adminUpdateExpense = async (req, res) => {
    const { expenseId } = req.params;
    const { title, price, note, date, category_id } = req.body;

    try {
        await pool.query(
            "UPDATE expenses SET title = ?, price = ?, note = ?, date = ?, category_id = ? WHERE id = ?",
            [title, price, note, date, category_id, expenseId]
        );
        res.json({ message: "Wydatek zaktualizowany pomyślnie." });
    } catch (error) {
        console.error("Błąd podczas aktualizacji wydatku:", error);
        res.status(500).json({ message: "Nie udało się zaktualizować wydatku." });
    }
};

exports.adminUpdateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    try {
        await pool.query(
            "UPDATE categories SET name = ?, description = ? WHERE id = ?",
            [name, description, categoryId]
        );
        res.json({ message: "Kategoria zaktualizowana pomyślnie." });
    } catch (error) {
        console.error("Błąd podczas aktualizacji kategorii:", error);
        res.status(500).json({ message: "Nie udało się zaktualizować kategorii." });
    }
};
