// use express router
const router = require("express").Router();

// require our api routes
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes.js");
// require homeRoutes
// require dashboardRoutes --> separate from homeRoutes, if you finish the homeRoutes firs

// router.use("/", homeRoutes);
router.use("/", homeRoutes);
// router.use("dashboard", dashboardRoutes);
// router.use("/api", apiRoutes);
router.use("/api", apiRoutes);


// export router
module.exports = router;
