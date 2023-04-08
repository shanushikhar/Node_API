const Bootcamp = require("../Modals/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc     Get All Bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    next(err);
  }
};

// @desc     Get Single Bootcamp
// @route    GET /api/v1/bootcamp/:id
// @access   Public

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp)
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    //next(new ErrorResponse(`${req.params.id} does not found`, 404));
    next(err);
  }
};

// @desc     Create New Bootcamp
// @route    POST /api/v1/bootcamps
// @access   Private

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcampres = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcampres,
    });
  } catch (err) {
    next(err);
  }

  // console.log(req.body)
  // res.status(201).json({
  //     success: true, msg: 'Create new bootcamp'
  // })
};

// @desc     Update a Bootcamp
// @route    PUT /api/v1/bootcamp/:id
// @access   Public

exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// @desc     Delete a Bootcamp
// @route    DELETE /api/v1/bootcamp/:id
// @access   Public

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp)
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );

    res.status(400).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};
