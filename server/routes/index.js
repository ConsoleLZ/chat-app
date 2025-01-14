const express = require("express");
const router = express.Router();
const {tokenManager} = require('../tokenManager')

// token校验
router.post("/verified", async function (req, res) {
  const token = req.body.token
  const result = tokenManager().decryptToken(token)

  if(result){
    res.send({
        ok: true
    })
  }else{
    res.send({
        ok: false
    })
  }
});
module.exports = router;