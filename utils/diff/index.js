const diffV1 = require('./diffV1')

const diff = {
  diffV1
}

const version = 1

module.exports = diff[`diffV${version}`]
module.exports.diffV1 = diffV1