const pool = require("../db/db");

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT id, username, email, role, created_at FROM users");
    res.json(users);
  } catch (error) {
    console.error("Błąd podczas pobierania użytkowników:", error);
    res.status(500).json({ message: "Nie udało się pobrać użytkowników." });
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
