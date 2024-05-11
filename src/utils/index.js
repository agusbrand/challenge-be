// Simple validation to make sure a date has the format 'YYYY-MM-DD'
const validateDate = (dateString) => {
  const match = dateString.match(/^\d{4}-\d{2}-\d{2}$/)

  if (!match) {
    throw new Error('Invalid date')
  }

  return dateString
}

module.exports = { validateDate }
