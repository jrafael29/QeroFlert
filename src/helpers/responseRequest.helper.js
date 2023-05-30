exports.successResponse = (response, payback, statusCode = 200) => {
  return response
    .json({
      success: true,
      body: payback,
      statusCode,
    })
    .status(statusCode)
    .end();
};
exports.errorResponse = (response, payback, statusCode = 500) => {
  return response
    .json({
      success: false,
      error: {
        message: payback,
        statusCode,
      },
    })
    .status(statusCode)
    .end();
};
