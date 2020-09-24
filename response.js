function SuccessResponse(values, res) {
  let data = {
    status: 200,
    values: values,
  };

  res.json(data);
  res.end();
}

function ErrorResponse(values, res, statusCode = 500) {
  let data = {
    status: statusCode,
    values: values,
  };

  res.json(data);
  res.end();
}

module.exports = {
  SuccessResponse,
  ErrorResponse,
};
