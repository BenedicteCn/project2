const router = require("express").Router();

router.get("/home", (req, res, next) => {
  res.sendFile("public/index.html");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
