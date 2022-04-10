import React from 'react'
import { Route, Switch } from 'wouter'

import { Home } from './views/Home'
import { Recipes } from './views/Recipes'
import { RecipeDetails } from './views/RecipeDetails'
import { UtilityButton } from './components/UtilityButton'

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
      <UtilityButton content="🏠" path="/" position="left" />
    </div>
  )
}

export default App

const getStyles = () => ({
  appContainer: {
    background: 'black',
    height: '100vh',
    width: '100vw',
  },
})
