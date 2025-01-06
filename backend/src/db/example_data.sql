CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    note TEXT,
    date DATE NOT NULL,
    category_id INT,
    user_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', 'password123'),
('jane_smith', 'jane@example.com', 'password456');

INSERT INTO categories (name) VALUES
('Groceries'),
('Bills'),
('Entertainment'),
('Travel');

INSERT INTO expenses (title, price, note, date, category_id, user_id) VALUES
('Weekly groceries', 50.25, 'Bought fruits and vegetables', '2025-01-01', 1, 1),
('Electricity bill', 100.00, 'Monthly electricity payment', '2025-01-02', 2, 1),
('Cinema tickets', 30.50, 'Watched a movie', '2025-01-03', 3, 2),
('Flight ticket', 200.75, 'Vacation to New York', '2025-01-04', 4, 2);
