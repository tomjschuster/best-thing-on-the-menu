const { procs } = require('../config')
const { callMysql } = require('../utilities')
const call = callMysql(procs)
console.log(call.getUser({a: 'abc'}, ['b', 'user']))
