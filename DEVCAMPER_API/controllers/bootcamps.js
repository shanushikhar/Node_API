const asyncHandler = require("../middleware/async");
const Bootcamp = require("../Modals/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc     Get All Bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // console.log(req.query);

  // handle more query
  let queryParams = JSON.stringify(req.query);
  queryParams = queryParams.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  console.log(queryParams, "-----", JSON.parse(queryParams));

  // {{URL}}/api/v1/bootcamps?averageCost[gte]=10000
  // {{URL}}/api/v1/bootcamps?careers[in]=Data Science
  const bootcamps = await Bootcamp.find(JSON.parse(queryParams));

  // {{URL}}/api/v1/bootcamps?location.state=MA&housing=true
  //const bootcamps = await Bootcamp.find(req.query);

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc     Get Single Bootcamp
// @route    GET /api/v1/bootcamp/:id
// @access   Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc     Create New Bootcamp
// @route    POST /api/v1/bootcamps
// @access   Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampres = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcampres,
  });
});

// @desc     Update a Bootcamp
// @route    PUT /api/v1/bootcamp/:id
// @access   Public

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    // this id is coming from routes...
    new: true,
    runValidators: true,
  });

  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc     Delete a Bootcamp
// @route    DELETE /api/v1/bootcamp/:id
// @access   Public

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );

  res.status(400).json({ success: true, data: bootcamp });
});

// not tested
exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const radius = distance / 3963;
  const latlng = [-71.324239, 42.650484];
  // need some proper lat & lng
  const lng = latlng[0];
  const lat = latlng[1];

  const bootcamp = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });
  res.status(200).json({
    success: true,
    count: bootcamp.length,
    data: bootcamp,
  });
});
