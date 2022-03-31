import React, { useEffect, useState } from 'react'
import { db, COLLECTIONS } from './utils/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

function App() {
  const styles = getStyles()
  const docID = '1tO1RY8iXzIuMdzz9knG'
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const docRef = doc(db, COLLECTIONS.RECIPES_BAKING, docID)

    const unsub = onSnapshot(docRef, (doc) => setRecipe(doc.data()))

    return () => unsub()
  }, [docID])

  return (
    <div style={styles.appContainer}>
      <header style={styles.appHeader}>
        <h1>Jameson Dashboard</h1>
        <h2 style={styles.subHead}>Ideas for the dashboard:</h2>
        <ul style={styles.unorderdList}>
          <li>Food/Recipes</li>
          <ul style={styles.unorderdList}>
            <li>Baked goods</li>
            <li>First baked recipe: {recipe ? recipe.name : 'Loading...'}</li>
            <ul>
              <li>{recipe ? recipe.description : 'Loading...'}</li>
            </ul>
            <li>Favorite recipes</li>
          </ul>
          <li>Beer/Cider Recipes</li>
          <ul style={styles.unorderdList}>
            <li>Share recipes</li>
            <li>Provide updates</li>
          </ul>
          <li>Travel/Adventure</li>
          <ul style={styles.unorderdList}>
            <li>Trip reports</li>
            <li>Trip planning/invites</li>
          </ul>
          <li>Favorites SLC Eats</li>
          <ul style={styles.unorderdList}>
            <li>Favorites by category</li>
            <li>Restaurant sampler parties</li>
          </ul>
        </ul>
      </header>
    </div>
  )
}

export default App

const getStyles = () => ({
  appContainer: {
    textAlign: 'center',
  },
  appHeader: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  subHead: {
    marginBottom: 0,
  },
  unorderdList: {
    textAlign: 'left',
    marginBottom: 20,
  },
})
