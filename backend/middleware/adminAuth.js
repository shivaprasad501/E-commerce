import jwt from 'jsonwebtoken'
const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if (token_decode !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        next();
    } catch (error) {
        console.error(error);
       res.json({ success: false, message:error.message });
    }
};

export default adminAuth;
