const asyncHandler = require("../middleware/async");
const Bootcamp = require("../Modals/Bootcamp");
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

// @desc     Get Course
// @route    GET /api/v1/courses
// @access   Public

// /api/v1/courses/5d725cd2c4ded7bcb480eaa2
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(
        `Courses cant be found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc     Create Course based on bootcamp
// @route    POST /api/v1/bootcamps/:bootcampId/courses
// @access   Private

// /api/v1/bootcamps/5d725a1b7b292f5f8ceff788/courses
exports.createCourse = asyncHandler(async (req, res, next) => {
  // adding bootcamp in req.body
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `bootcamp cant be found with id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc     Update Course
// @access   Private

// /api/v1/bootcamps/5d725a1b7b292f5f8ceff788/courses
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(
        `course cant be found with id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc     delete Course
// @access   Private

// /api/v1/bootcamps/5d725a1b7b292f5f8ceff788/courses
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`course cant be found with id of ${req.params.id}`, 404)
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
