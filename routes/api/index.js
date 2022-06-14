const router = require("express").Router();
const pizzaRoutes = require("./pizza-routes");

// add prefix of '/pizza' to routes created in pizza-routes.js
router.use("/pizza", pizzaRoutes)

module.exports = router;