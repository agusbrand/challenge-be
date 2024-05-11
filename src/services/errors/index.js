// Contains business errors thrown in the service layer

class DepositAmountError extends Error {
  constructor(
    message = "Amount to deposit can't exceed 25% of total jobs to pay",
  ) {
    super(message)
  }
}

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
  DepositAmountError,
  ForbiddenError,
  InvalidAmountError,
  InsufficientBalanceError,
  JobAlreadyPaidError,
  ResourceNotFoundError,
}
