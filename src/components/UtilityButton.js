import React, { useEffect } from 'react'
import { css } from 'glamor'

const positions = ['left', 'right']

export const UtilityButton = (props) => {
  const { color = 'slategrey', content, path, position = 'left' } = props
  const styles = getStyles(color)
  const positionStyles = position === 'left' ? styles.left : styles.right

  useEffect(() => {
    if (!positions.includes(position)) {
      console.error('Position Error: Please choose from ["left", "right"]')
    }
  }, [position])

  if (!positions.includes(position)) {
    return <p style={styles.error}>Position Error</p>
  }

  return (
    <a href={path} className={css({ ...styles.homeButton, ...positionStyles })}>
      {content}
    </a>
  )
}

const getStyles = (color) => ({
  error: {
    color: 'red',
    fontWeight: 'bolder',
    position: 'fixed',
    top: '10px',
    left: '45%',
  },
  homeButton: {
    background: color,
    borderRadius: '15px',
    color: 'white',
    height: '70px',
    position: 'fixed',
    bottom: '-45px',
    transition: 'bottom ease 0.5s',
    width: '80px',
    // Flexbox
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      bottom: '10px',
    },
  },
  left: {
    left: '15px',
    '@media(max-width: 768px)': {
      left: '5px',
      bottom: '5px',
      height: '50px',
      width: '55px',
    },
  },
  right: {
    right: '15px',
    '@media(max-width: 768px)': {
      right: '5px',
      bottom: '5px',
      height: '50px',
      width: '55px',
    },
  },
})
