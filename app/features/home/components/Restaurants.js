import React from 'react'
import { Link } from 'react-router'


const Restaurants =  ({ denormRestaurants }) => {
  let restaurants = denormRestaurants.map((o) => (
      <tr key={o.id}>
          <td>
              <Link to={'/restaurants/' + o.id}>{o.name}</Link>
          </td>
          <td>
              {o.address}
          </td>
          <td>
              {o.items && o.items.length}
          </td>
      </tr>
  ))

  return (
    <div>
      <table>
        <thead>
          <th>
            Restaurant
          </th>
          <th>
            Address
          </th>
          <th>
            Menu Items Reviewed
          </th>
        </thead>
        <tbody>
          {restaurants}
        </tbody>
      </table>
    </div>
  )
}

export default Restaurants
