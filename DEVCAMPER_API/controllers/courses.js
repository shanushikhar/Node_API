const asyncHandler = require("../middleware/async");
const Course = require("../Modals/Course");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc     Get Courses
// @route    GET /api/v1/courses
// @route    GET /api/v1/bootcamps/:bootcampId/courses
// @access   Public

// /api/v1/bootcamps/5d713a66ec8f2b88b8f830b8/courses
// /api/v1/courses
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId }); // in the section added bootcamp bcoz in courses there is one field called bootcamp so based on this we can find only that record
  } else {
    // populating the whole data of bootcamp
    //query = Course.find().populate("bootcamp");
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});
