// Contains business errors thrown in the service layer

class ForbiddenError extends Error {
  constructor(message = 'Forbidden request') {
    super(message)
  }
}

class ResourceNotFoundError extends Error {
  constructor(resourceName) {
    super(resourceName + ' not found')
  }
}

module.exports = {
  ForbiddenError,
  ResourceNotFoundError,
}
