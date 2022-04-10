import React from 'react'
import { css } from 'glamor'

export const RecipeButton = (props) => {
  const { onClick, recipe } = props
  const styles = getStyles()

  return (
    <button className={css(styles.container)} onClick={onClick}>
      <h1 style={styles.title}>{recipe.name}</h1>
      <span style={styles.pill}>{recipe.type}</span>
    </button>
  )
}

const getStyles = () => ({
  container: {
    background: 'transparent',
    borderStyle: 'none',
    cursor: 'pointer',
    height: '100%',
    maxWidth: '33%',
    flex: 5,
    '&:hover': {
      background: '#222222',
    },
    '@media(max-width: 768px)': {
      maxHeight: '33%',
      width: '100%',
      maxWidth: 'initial',
    },
    // Flexbox
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    // The next three styles create gradient text
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '2.75em',
    textShadow: '0 0 10px #8DFFA8',
  },
  pill: {
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    borderRadius: '20px',
    padding: '6px 8px',
    fontSize: '.9em',
    fontWeight: '600',
  },
})
