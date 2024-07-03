import TPO from '../models/TPO.js';

const tpo = (async (req, res, next) => {
    try {
        let tpo = await TPO.findById(req.user.id);
        if (!tpo) {
            return res.status(404).send("User not found");
        }
        if (!(tpo.permissions.includes("tpo") || tpo.permissions.includes("company"))) {
            return res.status(403).send("Not allowed to perform this action");
        }
        req.tpo = tpo;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Server tpo error");
    }
});

export default tpo;