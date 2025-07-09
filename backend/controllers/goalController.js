const asyncHandler = require('express-async-handler')
const dataStore = require('../dataStore')
const httpStatus = require('http-status')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  
  const goals = await dataStore.findGoalsByUser(req.user._id)

  res.status(httpStatus.default.OK).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(httpStatus.default.BAD_REQUEST)
    throw new Error('Please add a text field')
  }

  const goal = await dataStore.createGoal({
    text: req.body.text,
    user: req.user._id,
  })
  // this one used to OK
  res.status(httpStatus.default.CREATED).json(goal)
})

  // @desc    Update goal
  // @route   PUT /api/goals/:id
  // @access  Private
  const updateGoal = asyncHandler(async (req, res) => {
    const goal = await dataStore.findGoalById(req.params.id)

    if (!goal) {
      res.status(httpStatus.default.NOT_FOUND)
      throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
      res.status(httpStatus.default.UNAUTHORIZED)
      throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user !== req.user._id) {
      // this one used to UNAUTHORIZED
      res.status(httpStatus.default.FORBIDDEN)
      throw new Error('User not authorized')
    }

    const updatedGoal = await dataStore.updateGoal(req.params.id, req.body)

    res.status(httpStatus.default.OK).json({ message: 'Goal updated successfully', goal })
  })

  // @desc    Delete goal
  // @route   DELETE /api/goals/:id
  // @access  Private
  const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await dataStore.findGoalById(req.params.id)

    if (!goal) {
      res.status(httpStatus.default.NOT_FOUND)
      throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
      res.status(httpStatus.default.UNAUTHORIZED)
      throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user !== req.user._id) {
      // this one used to UNAUTHORIZED
      res.status(httpStatus.default.FORBIDDEN)
      throw new Error('User not authorized')
    }

    await dataStore.deleteGoal(req.params.id)

    res.status(httpStatus.default.OK).json({ message: 'Goal deleted successfully' })
  })

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
