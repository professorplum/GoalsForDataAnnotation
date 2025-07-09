// In-memory data store using LokiJS
// Data will be lost when the server restarts

const Loki = require('lokijs')

class InMemoryStore {
  constructor() {
    // Create in-memory database
    this.db = new Loki('goalsetter.db', {
      autoload: false,
      autosave: false,
      persistenceMethod: null // In-memory only
    })

    // Initialize collections
    this.users = this.db.addCollection('users', {
      unique: ['email'],
      indices: ['email', '_id']
    })

    this.goals = this.db.addCollection('goals', {
      indices: ['_id', 'user']
    })
  }

  // User operations
  async createUser(userData) {
    try {
      const user = {
        _id: this.generateId(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      return this.users.insert(user)
    } catch (error) {
      if (error.message.includes('unique')) {
        throw new Error('User with this email already exists')
      }
      throw error
    }
  }

  async findUserByEmail(email) {
    return this.users.findOne({ email })
  }

  async findUserById(id) {
    return this.users.findOne({ _id: id })
  }

  // Goal operations
  async createGoal(goalData) {
    // Verify user exists
    const user = await this.findUserById(goalData.user)
    if (!user) {
      throw new Error('User not found')
    }

    const goal = {
      _id: this.generateId(),
      text: goalData.text,
      user: goalData.user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return this.goals.insert(goal)
  }

  async findGoalsByUser(userId) {
    return this.goals.find({ user: userId })
  }

  async findGoalById(id) {
    return this.goals.findOne({ _id: id })
  }

  async updateGoal(id, updateData) {
    const goal = this.goals.findOne({ _id: id })
    if (!goal) {
      return null
    }
    
    // Update the goal object with new data
    Object.assign(goal, updateData, { updatedAt: new Date().toISOString() })
    
    // Update in collection
    this.goals.update(goal)
    return goal
  }

  async deleteGoal(id) {
    const goal = this.goals.findOne({ _id: id })
    if (goal) {
      this.goals.remove(goal)
      return true
    }
    return false
  }

  // Utility methods
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Clear all data (useful for testing)
  clear() {
    this.users.clear()
    this.goals.clear()
  }
}

// Create a singleton instance
const dataStore = new InMemoryStore()

module.exports = dataStore 