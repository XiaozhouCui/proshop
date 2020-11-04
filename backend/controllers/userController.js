import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUsers = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    next(new Error('Please provide email and password.'))
  }

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export { authUsers }
