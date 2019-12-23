const express = require("express");
const router = express.Router();

// router.get("/", (req, res, next) => {
//     res.json({status: 'ok'});
// });

// MARK: - GET home page
router.get('/', function(req, res, next) {
    let token = "AQDaTDHfXAJZFXi4gi8A3TjEYTa-ajs1FHAucW4sn5kj55JBgeCaoOqkG_9ccwoU3aPQAz0joR0HZcMvEPyHwN9s1sR1QSpxh3wXcIxeZqe5o-8x4rsfvg9Vq";
    res.setHeader('Authorization', 'Bearer '+ token);
    res.render('index.ejs');
});

router.get('/profile', function(req, res){
    res.render('profile.ejs', { user: req.user });
});


module.exports = router;
