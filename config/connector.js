const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://root:1234@cluster0.h4iejmb.mongodb.net/project-cloud', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('[INFO] Connected to MongoDB');
  } catch (error) {
    console.error('[ERROR] Error connecting to MongoDB:', error);
  }
};
module.exports = connectDB;

// const mysql = require('mysql');
// const UsersTable = require('../db.migration/UsersTable');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'cloud-private',
//     port: 3306,
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('[ERROR] Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('[INFO] Connected to MySQL');

//     connection.query(UsersTable, (error, results) => {
//         if (error) {
//             console.error('[ERROR] Error executing migration query:', error);
//         } else {
//             console.log('[INFO] Migration query executed successfully');
//         }
//         // Close the database connection
//         connection.end();
//     });
// });
