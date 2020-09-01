const { createUser, getUsers, getUserById, updateUser, deleteUser, getUserByEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync} = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                })
            }
            return res.status(201).json({
                success: 1,
                data: results
            })
        })
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                })
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                })
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    updateUser: (req, res) => {
        const data = req.body;
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, slat);
        updateUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'Updated Successfully'
            })
        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.status(204).json({
                success: 1,
                message: 'user deleted successfully'
            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err)
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Invalid email and password' 
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsonWebToken = sign({ result: results }, process.env.ENCRYPTION_KEY, {
                    expiresIn: '1h'
                })
                return res.status(200).json({
                    success: 1,
                    message: 'login successfully',
                    token: jsonWebToken
                })
            } else {
                return res.json({
                    success: 0,
                    message: 'Invalid email and password'
                });
            }
        });
    }

}