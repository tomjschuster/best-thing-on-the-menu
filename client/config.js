export const autocompleteOptions = {
  types: ['establishment'],
  bounds: {
    south: process.env.SOUTH || 40.734634,
    north: process.env.NORTH || 40.752200,
    west: process.env.WEST || -74.002601,
    east: process.env.EAST || -73.981465
  },
  strictBounds: true
}
