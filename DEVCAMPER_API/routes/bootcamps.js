const express = require("express");
const {
  createBootcamp,
  getBootcamps,
  updateBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcampInRadius,
} = require("../controllers/bootcamps");

// Resource Router
const courseRouter = require("./courses");

const router = express.Router();

// Re-route another course router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampInRadius);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
