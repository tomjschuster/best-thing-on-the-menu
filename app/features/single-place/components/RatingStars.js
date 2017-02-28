import React from 'react'
import IconButton from 'material-ui/IconButton'
import Star from 'material-ui/svg-icons/toggle/star'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

const RatingStars = ({ starCount, onClick }) => (
    <div>
      { Array(5).fill(0).map((_, idx) => (
            <IconButton
              key={`star-${idx + 1}`}
              onClick={ () => onClick(idx + 1) }>
              { starCount <= idx ? <StarBorder /> : <Star /> }
            </IconButton>
          )
        )
      }
    </div>
  )

export default RatingStars
