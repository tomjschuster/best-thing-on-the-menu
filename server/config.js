const db = {
  user: 'root',
  host: 'localhost',
  db: 'btotm',
  metadata: true
}

const procs = {
  getUser: {
    inParams: ['user_id'],
    outParams: ['num_users']
  }
}


module.exports = { db, procs }
