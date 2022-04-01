import React from 'react'
import { css } from 'glamor'
import { useLocation } from 'wouter'

import { HomeButton } from '../components/HomeButton'

export const Home = (props) => {
  const [_, setLocation] = useLocation() // eslint-disable-line no-unused-vars
  const styles = getStyles()

  return (
    <div className={styles.container}>
      <HomeButton onClick={() => setLocation('/recipes')} title="Recipes" />
      <HomeButton title="Brewing" />
      <HomeButton title="Travel" />
      <HomeButton title="Eats" />
    </div>
  )
}

const getStyles = () => ({
  container: css({
    display: 'flex',
    '@media(max-width: 768px)': {
      flexDirection: 'column',
    },
  }),
})
