import React from 'react'
import { Route, Switch } from 'wouter'

import { Home } from './views/Home'
import { Recipes } from './views/Recipes'

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
      </Switch>
    </div>
  )
}

export default App

const getStyles = () => ({
  appContainer: {
    // textAlign: 'center',
  },
  subHead: {
    marginBottom: 0,
  },
  unorderdList: {
    textAlign: 'left',
    marginBottom: 20,
  },
})
