const bcrypt = require("bcrypt")

const saltRounds = 10

// Hash Passwords
const hashPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds);
}

// Validate Passwords
const validatePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { hashPassword, validatePassword }