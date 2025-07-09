const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const dataStore = require('../dataStore')
const httpStatus = require('http-status')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      const user = await dataStore.findUserById(decoded.id)
      if (user) {
        // Remove password from user object
        const { password, ...userWithoutPassword } = user
        req.user = userWithoutPassword
        next()
      } else {
        res.status(httpStatus.default.UNAUTHORIZED)
        throw new Error('User not found - please log in again')
      }
    } catch (error) {
      res.status(httpStatus.default.UNAUTHORIZED)
      throw new Error('Not authorized - please log in again')
    }
  }

  if (!token) {
    res.status(httpStatus.default.UNAUTHORIZED)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
