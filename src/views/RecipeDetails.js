import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useLocation } from 'wouter'

import { db, COLLECTIONS } from '../utils/firebase'

export const RecipeDetails = (props) => {
  const { recipeId } = props
  const [_, setLocation] = useLocation() // eslint-disable-line no-unused-vars
  const [recipe, setRecipe] = useState(null)
  const styles = getStyles()

  useEffect(() => {
    const docRef = doc(db, COLLECTIONS.RECIPES_BAKING, recipeId)

    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setRecipe({ id: docSnap.id, ...docSnap.data() })
      } else {
        // HERE: Add error to UI
        console.warn(`Recipe doesn't exist. ${recipeId}`)
      }
    })
  }, [recipeId])

  if (!recipe) {
    return (
      <div style={styles.container}>
        <h1 style={styles.name}>Loading...</h1>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => window.history.back()} style={styles.backButton}>
          ⬅︎
        </button>
        <span style={styles.pill}>{recipe.type}</span>
      </div>
      <h1 style={styles.name}>{recipe.name}</h1>

      <p style={styles.paragraph}>{recipe.description}</p>

      <table style={styles.timingTable}>
        <tbody style={styles.tableBody}>
          <tr>
            <td style={styles.tableCell}>Yield: {recipe.servings}</td>
            <td style={styles.tableCell}>Prep: {recipe.timing.prep}</td>
          </tr>
          <tr>
            <td style={styles.tableCell}>Wait: {recipe.timing.wait}</td>
            <td style={styles.tableCell}>Bake: {recipe.timing.cook}</td>
          </tr>
        </tbody>
      </table>

      <p style={styles.paragraph}>Ingredients and directions coming soon!!</p>
    </div>
  )
}

const getStyles = () => ({
  container: {
    height: '100%',
    margin: '0 auto',
    maxWidth: '400px',
    padding: '15px',
    width: '100vw',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '5px 13px',
  },
  pill: {
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    borderRadius: '20px',
    padding: '4px 6px',
    fontSize: '.6em',
  },
  name: {
    // margin: 0,
    // The next three styles create gradient text
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  paragraph: {
    // The next three styles create gradient text
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  timingTable: {
    margin: '0 auto',
    width: '90%',
  },
  tableBody: {
    width: '100%',
  },
  tableCell: {
    border: '1.5px solid white',
    borderRadius: '10px',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    width: '50%',
    // The next three styles create gradient text
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
})
