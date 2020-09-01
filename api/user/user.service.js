const pool = require('../../config/database');

module.exports = {
    createUser: (data, callback) => {
        pool.query(
            `INSERT INTO user_data(name, email, phone, password) VALUES (?, ?, ?, ?)`,
            [data.name, data.email, data.phone, data.password],
            (err, results, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, results)
            }
        );
    },
    getUsers: (callback) => {
        pool.query(
            `SELECT id,name,email,phone FROM user_data`,
            [], 
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    getUserById: (id, callback) => {
        pool.query(
            `SELECT id,name,email,phone FROM user_data WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        pool.query(
            `UPDATE user_data SET name = ?, email = ?, phone = ? password = ? WHERE id = ?`,
            [data.name, data.email, data.phone, data.password, data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    deleteUser: (data, callback) => {
        pool.query(
            `DELETE FROM user_data WHERE id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    getUserByEmail: (email, callback) => {
        pool.query(
            'SELETE * FROM user_data WHERE email = ?',
            [email],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        );
    }
}