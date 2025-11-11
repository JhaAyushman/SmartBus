import { Router } from 'express';

const router = Router();


//Displays information tailored according to the logged in user
router.get('/profile', (req, res, next) => {
    res.json({
        user: req.user,
        token: req.query.secret_token
    })
});

export default router;