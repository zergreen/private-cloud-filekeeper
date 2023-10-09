module.exports = `
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255),
        email VARCHAR(255),
        create_at DATE
    )
`;
