import React from 'react'
import { css } from 'glamor'

export const HomeButton = (props) => {
  const { onClick, title } = props
  const styles = getStyles()

  return (
    <button
      className={css(styles.container)}
      onClick={() => (onClick ? onClick() : alert(`${title}: Coming Soon!!`))}
    >
      <h1 style={styles.title}>{title}</h1>
    </button>
  )
}

const getStyles = () => ({
  container: {
    background: 'black',
    borderStyle: 'none',
    cursor: 'pointer',
    height: '100vh',
    width: '25%',
    '&:hover': {
      background: '#222222',
      color: 'black',
    },
    '@media(max-width: 768px)': {
      width: '100%',
      height: '25vh',
    },
    // Flexbox
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // The next three styles create gradient text
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '45px',
    textShadow: '0 0 10px #8DFFA8',
  },
})
