-- Dodanie użytkowników
INSERT INTO users (username, email, password, role) VALUES
('JanKowalski', 'jan.kowalski@example.com', 'hashed_password1', 'user'),
('AnnaNowak', 'anna.nowak@example.com', 'hashed_password2', 'user'),
('Admin', 'admin@example.com', 'hashed_password3', 'admin');

-- Dodanie kategorii dla użytkownika JanKowalski
INSERT INTO categories (name, description, user_id) VALUES
('Jedzenie', 'Wydatki na jedzenie i napoje', 1),
('Transport', 'Koszty związane z podróżami', 1),
('Rachunki', 'Rachunki domowe', 1),
('Rozrywka', NULL, 1);

-- Dodanie kategorii dla użytkownika AnnaNowak
INSERT INTO categories (name, description, user_id) VALUES
('Zakupy', 'Zakupy odzieży i obuwia', 2),
('Edukacja', 'Koszty związane z nauką', 2),
('Zdrowie', 'Wydatki na zdrowie i lekarstwa', 2);

-- Dodanie wydatków dla użytkownika JanKowalski
INSERT INTO expenses (title, price, note, date, category_id, user_id) VALUES
('Zakupy spożywcze', 123.45, 'Kupione w Biedronce', '2025-01-05', 1, 1),
('Bilet miesięczny', 90.00, 'Komunikacja miejska', '2025-01-01', 2, 1),
('Prąd', 200.50, 'Rachunek za grudzień', '2025-01-03', 3, 1);

-- Dodanie wydatków dla użytkownika AnnaNowak
INSERT INTO expenses (title, price, note, date, category_id, user_id) VALUES
('Kurs online', 299.99, 'Kurs programowania', '2025-01-04', 6, 2),
('Lekarstwa', 45.00, 'Zakupione w aptece', '2025-01-06', 7, 2);
