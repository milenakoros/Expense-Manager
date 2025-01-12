const bcrypt = require("bcrypt");
const pool = require("../db/db");

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Wszystkie pola są wymagane." });
    }

    try {
        const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
        if (!user.length) {
            return res.status(404).json({ message: "Użytkownik nie znaleziony." });
        }

        const storedPassword = user[0].password;

        const isMatch = await bcrypt.compare(currentPassword, storedPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Podane aktualne hasło jest nieprawidłowe." });
        }

        console.log("Nowe hasło (przed hashowaniem):", newPassword);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        console.log("Nowe hasło (zaszyfrowane):", hashedPassword);

        await pool.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, req.user.id]);

        res.status(200).json({ message: "Hasło zostało pomyślnie zmienione." });
    } catch (error) {
        console.error("Błąd podczas zmiany hasła:", error);
        res.status(500).json({ message: "Nie udało się zmienić hasła. Spróbuj ponownie później." });
    }
};

exports.verifyPassword = async (req, res) => {
    const { currentPassword } = req.body;

    if (!currentPassword) {
        return res.status(400).json({ message: "Hasło jest wymagane." });
    }

    try {
        const [user] = await pool.query("SELECT password FROM users WHERE id = ?", [req.user.id]);

        if (!user.length) {
            return res.status(404).json({ message: "Użytkownik nie znaleziony." });
        }

        const storedPassword = user[0].password;
        const isMatch = await bcrypt.compare(currentPassword, storedPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Podane hasło jest nieprawidłowe." });
        }

        res.status(200).json({ message: "Hasło poprawne." });
    } catch (error) {
        console.error("Błąd podczas weryfikacji hasła:", error);
        res.status(500).json({ message: "Nie udało się zweryfikować hasła." });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const [user] = await pool.query(
            `SELECT id, username, email FROM users WHERE id = ?`,
            [req.user.id]
        );
        if (!user.length) {
            return res.status(404).json({ message: "Użytkownik nie znaleziony." });
        }
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ message: "Nie udało się pobrać danych użytkownika." });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Nazwa użytkownika jest wymagana." });
    }

    try {
        await pool.query(
            `UPDATE users SET username = ? WHERE id = ?`,
            [username, req.user.id]
        );
        res.json({ message: "Profil zaktualizowany pomyślnie." });
    } catch (error) {
        res.status(500).json({ message: "Nie udało się zaktualizować profilu." });
    }
};