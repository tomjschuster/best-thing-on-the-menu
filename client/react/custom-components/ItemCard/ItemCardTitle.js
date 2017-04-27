import React from 'react'
import { CardTitle } from 'react-toolbox/lib/card'
import theme from './ItemCardTitle.css'

const ItemCardTitle = ({ ...props }) => (
      <CardTitle {...props} theme={theme} />
  )

export default ItemCardTitle
