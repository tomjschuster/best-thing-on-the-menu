import React, { Component } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'


export default class RestaurantList extends Component {

    render () {
      const { formattedRestaurants } = this.props

    let restaurants = formattedRestaurants.map((o) => (
        <tr key={o.id}>
            <td>
                <Link to={'/restaurants/'+o.id}>{o.name}</Link>
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
}
