import React, { Component } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'


export default class RestaurantList extends Component {

    render () {
      const { formattedRestaurants } = this.props
        let items = [
            { id: 1, name: '1', address: '2', numOfReviews: 3, numOfStarts: 4},
            { id: 2, name: '2', address: '2', numOfReviews: 3, numOfStarts: 4}
        ]

    let restaurants = formattedRestaurants.map((o) => (
        <tr key={o.id}>
            <td>
                <Link to={'/restaurants/'+o.id}>{o.name}</Link>
            </td>
            <td>
                {o.address}
            </td>
            <td>
                {o.reviews && o.reviews.length}
            </td>
            <td>
                {o.stars}
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
                    Number Of Reviews
                </th>
                <th>
                    Number Of Stars
                </th>
               </thead>
               <tbody>
                {restaurants}
               </tbody>
           </table>

       </div>
    )
    }
}
