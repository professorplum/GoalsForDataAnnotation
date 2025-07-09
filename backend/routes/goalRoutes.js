const httpStatus = require('http-status')
const express = require('express')
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')


const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

router.route('/').all((req, res) => {
  res.status(httpStatus.default.METHOD_NOT_ALLOWED).json({ message: 'Method not allowed' })
})

module.exports = router
