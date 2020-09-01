const { verify } = require('jsonwebtoken');

module.exports = {
    varifyToken: (req, res, next) => {
        const token = req.get('authorization');
        if (token) {
            token = token.slice(7);
            verify(token, process.env.ENCRYPTION_KEY, (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        messsage: 'Invalid token'
                    })
                } else {
                    next();
                }
            })
        } else {
            return res.json({
                sucess: 0,
                messsage: 'Access denied!'
            });
        }
    }
}