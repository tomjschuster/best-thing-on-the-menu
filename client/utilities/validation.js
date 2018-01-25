const capitalize = str =>
  str
    .toLowerCase()
    .split('')
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join('')

const requiredMsg = xs => {
  switch (xs.length) {
    case 0:
      return null
    case 1:
      return `${capitalize(xs[0])} is required`
    default:
      return xs
        .map((x, idx) => {
          if (idx === 0) return `${capitalize(x)}`
          else if (idx === xs.length - 1) return ` and ${x} are required`
          else return `, ${x}`
        })
        .join('')
  }
}

export const validateRequired = (fields = {}) =>
  requiredMsg(
    Object.keys(fields).reduce((acc, k) => (fields[k] ? acc : [...acc, k]), [])
  )
