// @desc     Get All Bootcamp
// @route    GET /api/v1/bootcamps
// @access   Public

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        success: true, msg: 'Show all bootcamps'
    })
}

// @desc     Get Single Bootcamp
// @route    GET /api/v1/bootcamp/:id
// @access   Public

exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true, msg: `Show ${req.params.id} bootcamp `,
        middlewareValue: req.hello
    })
}

// @desc     Create New Bootcamp
// @route    POST /api/v1/bootcamps
// @access   Private

exports.createBootcamp = (req, res, next) => {
    res.status(201).json({
        success: true, msg: 'Create new bootcamp'
    })
}

// @desc     Update a Bootcamp
// @route    PUT /api/v1/bootcamp/:id
// @access   Public

exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true, msg: `Update ${req.params.id} bootcamp `
    })
}

// @desc     Delete a Bootcamp
// @route    DELETE /api/v1/bootcamp/:id
// @access   Public

exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true, msg: `Delete ${req.params.id} bootcamp `
    })
}

