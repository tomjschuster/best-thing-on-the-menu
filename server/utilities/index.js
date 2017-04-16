const callMysql = require('./call-mysql')

const taskstreamEmailRegex = /^[A-Z0-9._%+-]+@taskstream.com$/i
const isTaskstreamEmail = email => taskstreamEmailRegex.test(email)


module.exports = { callMysql, isTaskstreamEmail }
