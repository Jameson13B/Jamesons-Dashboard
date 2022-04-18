import React from 'react'
import { Route, Switch } from 'wouter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faFireBurner } from '@fortawesome/free-solid-svg-icons'

import { Home } from './views/Home'
import { Recipes } from './views/Recipes'
import { RecipeDetails } from './views/RecipeDetails'
import { UtilityButtons } from './components/UtilityButtons'

function App() {
  const styles = getStyles()

  return (
    <div style={styles.appContainer}>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/recipes">
          <Recipes />
        </Route>
        <Route path="/recipes/:id">{(params) => <RecipeDetails recipeId={params.id} />}</Route>
      </Switch>
      <UtilityButtons
        buttons={[
          {
            content: <FontAwesomeIcon icon={faHouse} color="black" size="lg" />,
            path: '/',
            color: 'linear-gradient(to right, #E1FF31, #8dffa8)',
          },
          {
            content: <FontAwesomeIcon icon={faFireBurner} color="black" size="lg" />,
            path: '/recipes',
            color: 'linear-gradient(to right, #E1FF31, #8dffa8)',
          },
        ]}
        position="left"
      />
    </div>
  )
}

export default App

const getStyles = () => ({
  appContainer: {
    background: 'black',
    height: '100%',
    width: '100%',
  },
})
