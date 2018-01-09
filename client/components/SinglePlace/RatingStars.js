import React from 'react'
import { Button } from 'react-toolbox/lib/button'
import FontIcon from 'react-toolbox/lib/font_icon'


export const ReviewStars = ({ starCount, className }) => (
  <span className={className}>
    {Array(starCount).fill(0).map((_, idx) => (
      <FontIcon
        key={`star-${idx + 1}`}
        value='star'
      />
    ))}
  </span>
)

export const AddReviewStars = ({ starCount, onClick, className }) => (
  <div className={className}>
    {Array(5).fill(0).map((_, idx) => (
      <Button
        key={`star-${idx + 1}`}
        onClick={() => onClick(idx + 1)}
        icon={starCount <= idx ? 'star_border' : 'star'}
      />
    ))}
  </div>
)
