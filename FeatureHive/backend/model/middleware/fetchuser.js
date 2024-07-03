import jwt from 'jsonwebtoken';

const JWT_token = "featurehivesecret";

const fetchUser = (req, res, next) => {

    try {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).json({ Error: "Please enter correct auth token" });
        }
        else {
            const data = jwt.verify(token, JWT_token);
            req.user = data;
            next();
        }
    } catch (error) {
        // console.error(error);
        res.status(401).json({ Error: "Invalid Token" });
    }

}

export default fetchUser;