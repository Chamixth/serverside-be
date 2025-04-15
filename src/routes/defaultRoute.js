const express = require('express');
const router = express.Router();

router.get('',(req, res) => {
    return res.status(200).json({"message": "this is the rest-country middleware"});
});

module.exports = router;