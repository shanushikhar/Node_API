const express = require("express");
const {
  createBootcamp,
  getBootcamps,
  updateBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcampInRadius,
} = require("../controllers/bootcamps");

const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getBootcampInRadius);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
