const pool = require("../db/db");

exports.addArticle = async (req, res) => {
    const { title, content, link, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ message: "Brak wymaganych danych." });
    }

    try {
        await pool.query(
            "INSERT INTO articles (title, content, link, author) VALUES (?, ?, ?, ?)",
            [title, content, link || null, author]
        );
        res.json({ message: "Artykuł został dodany pomyślnie." });
    } catch (error) {
        console.error("Błąd podczas dodawania artykułu:", error);
        res.status(500).json({ message: "Nie udało się dodać artykułu." });
    }
};

exports.getArticleById = async (req, res) => {
    const { id } = req.params;

    try {
        const [article] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);

        if (article.length === 0) {
            return res.status(404).json({ message: "Nie znaleziono artykułu o podanym ID." });
        }

        res.json(article[0]);
    } catch (error) {
        console.error("Błąd podczas pobierania artykułu:", error);
        res.status(500).json({ message: "Nie udało się pobrać artykułu." });
    }
};

exports.updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, link } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Brak wymaganych danych do aktualizacji." });
    }

    try {
        const [result] = await pool.query(
            "UPDATE articles SET title = ?, content = ?, link = ? WHERE id = ?",
            [title, content, link || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nie znaleziono artykułu do aktualizacji." });
        }

        res.json({ message: "Artykuł został zaktualizowany pomyślnie." });
    } catch (error) {
        console.error("Błąd podczas aktualizacji artykułu:", error);
        res.status(500).json({ message: "Nie udało się zaktualizować artykułu." });
    }
};

exports.deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nie znaleziono artykułu do usunięcia." });
        }

        res.json({ message: "Artykuł został usunięty pomyślnie." });
    } catch (error) {
        console.error("Błąd podczas usuwania artykułu:", error);
        res.status(500).json({ message: "Nie udało się usunąć artykułu." });
    }
};

exports.getArticles = async (req, res) => {
    try {
        const [articles] = await pool.query("SELECT * FROM articles ORDER BY created_at DESC");
        res.json(articles);
    } catch (error) {
        console.error("Błąd podczas pobierania artykułów:", error);
        res.status(500).json({ message: "Nie udało się pobrać artykułów." });
    }
};
