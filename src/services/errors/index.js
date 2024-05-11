// Contains business errors thrown in the service layer

class ForbiddenError extends Error {
  constructor(message = 'Forbidden request') {
    super(message)
  }
}

class InvalidAmountError extends Error {
  constructor(message = 'Invalid amount') {
    super(message)
  }
}

class InsufficientBalanceError extends Error {
  constructor(message = 'Insufficient balance') {
    super(message)
  }
}

class JobAlreadyPaidError extends Error {
  constructor(message = 'Job was already paid') {
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
  InvalidAmountError,
  InsufficientBalanceError,
  JobAlreadyPaidError,
  ResourceNotFoundError,
}
