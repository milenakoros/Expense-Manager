const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../db/db');

exports.register = [
    body('username').notEmpty().withMessage('Nazwa użytkownika jest wymagana.'),
    body('email').isEmail().withMessage('Nieprawidłowy format adresu e-mail.'),
    body('password')
        .custom((value) => {
            const hasMinLength = value.length >= 8;
            const hasLowerCase = /[a-z]/.test(value);
            const hasUpperCase = /[A-Z]/.test(value);
            const hasDigit = /\d/.test(value);
            const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);

            if (!hasMinLength || !hasLowerCase || !hasUpperCase || !hasDigit || !hasSpecialChar) {
                throw new Error(
                    'Hasło musi mieć co najmniej 8 znaków, zawierać małą i wielką literę, cyfrę oraz znak specjalny.'
                );
            }
            return true;
        }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Podany adres e-mail jest już zarejestrowany.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            );

            res.status(201).json({ message: 'Rejestracja zakończona sukcesem!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Wystąpił błąd serwera.' });
        }
    },
];

exports.login = [
    body('email').isEmail().withMessage('Nieprawidłowy format adresu e-mail.'),
    body('password').notEmpty().withMessage('Hasło jest wymagane.'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (user.length === 0) {
                return res.status(404).json({ message: 'Nie znaleziono użytkownika o podanym adresie e-mail.' });
            }

            const isMatch = await bcrypt.compare(password, user[0].password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Nieprawidłowe hasło.' });
            }

            const token = jwt.sign(
                { id: user[0].id, role: user[0].role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ token, role: user[0].role });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Wystąpił błąd serwera.' });
        }
    },
];
