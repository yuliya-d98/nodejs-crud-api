class ApiError extends Error {
  status;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static NonExistingEndpointError() {
    return new ApiError(404, 'Sorry, no endpoint found.');
  }

  static InvalidUserIdError() {
    return new ApiError(404, 'Sorry, no users found for this userId.');
  }

  static InvalidUserBodyError() {
    return new ApiError(400, 'Sorry, request body does not contain required fields.');
  }

  static ServerSideError() {
    return new ApiError(500, 'Sorry, server-side error occurred.');
  }
}
export default ApiError;