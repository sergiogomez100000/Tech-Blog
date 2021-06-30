// use express router
const router = require("express").Router();

// require our api, home and dashboard routes
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes.js");
const dashboardRoutes = require("./dashboardRoutes.js")

//use api, home, and dashboard route
router.use("/", homeRoutes);
router.use("dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

// export router
module.exports = router;
