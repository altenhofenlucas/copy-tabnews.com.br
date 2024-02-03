function status(request, response) {
  return response.status(200).json({
    message: "test",
  });
}

export default status;
