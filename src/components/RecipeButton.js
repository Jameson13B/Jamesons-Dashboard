import React from 'react'
import { css } from 'glamor'

export const RecipeButton = (props) => {
  const { recipe } = props
  const styles = getStyles()

  return (
    <button
      className={css(styles.container)}
      onClick={() => alert(`${recipe.name}: Coming Soon!!`)}
    >
      <h1 style={styles.title}>{recipe.name}</h1>
    </button>
  )
}

const getStyles = () => ({
  container: {
    background: 'transparent',
    borderStyle: 'none',
    cursor: 'pointer',
    height: '100vh',
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
