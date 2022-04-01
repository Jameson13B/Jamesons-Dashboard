import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

import { db, COLLECTIONS } from '../utils/firebase'

export const Recipes = () => {
  const [recipe, setRecipe] = useState(null)
  const styles = getStyles()
  const docID = '1tO1RY8iXzIuMdzz9knG'

  useEffect(() => {
    const docRef = doc(db, COLLECTIONS.RECIPES_BAKING, docID)

    const unsub = onSnapshot(docRef, (doc) => setRecipe(doc.data()))

    return () => unsub()
  }, [docID])

  return (
    <div style={styles.container}>
      {recipe ? (
        <>
          <h1 style={styles.title}>{recipe.name}</h1>
          <p style={styles.description}>{recipe.description}</p>
        </>
      ) : (
        <h1 style={styles.title}>Loading...</h1>
      )}
    </div>
  )
}

const getStyles = () => ({
  container: {
    background: 'black',
    height: '100vh',
    width: '100vw',
  },
  title: {
    // The next three styles create gradient text
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    // The next three styles create gradient text
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
})
