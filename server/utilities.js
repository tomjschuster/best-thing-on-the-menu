
const emailRegex = domain => new RegExp('^[A-Z0-9._%+-]+@' + domain + '$', 'i')
const emailHasValidDomain = (email, domains) =>
  domains.reduce((acc, x) => acc ||  emailRegex(x.domain).test(email), false)

module.exports = { emailHasValidDomain }
