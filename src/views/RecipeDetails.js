import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useLocation } from 'wouter'
import { css } from 'glamor'

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
    <div className={css(styles.container)}>
      <div style={styles.header}>
        <button onClick={() => window.history.back()} style={styles.backButton}>
          ⬅︎
        </button>
        <span style={styles.pill}>{recipe.type}</span>
      </div>
      <h1 style={styles.name}>{recipe.name}</h1>

      <p>{recipe.description}</p>

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

      <h2 style={styles.heading}>Ingredients:</h2>
      <ul style={styles.ingredients}>
        {recipe.ingredients.map((ingredient, i) => (
          <li key={i} className={css(styles.ingredient)}>
            {ingredient}
          </li>
        ))}
      </ul>

      <h2 style={styles.heading}>Directions:</h2>
      <ol style={{ margin: 0 }}>
        {recipe.directions.map((direction, i) => (
          <li key={i} className={css(styles.direction)}>
            {direction}
          </li>
        ))}
      </ol>
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
    '& p, td, li, li::before': {
      // The next three styles create gradient text
      background: 'linear-gradient(to right, #E1FF31, #8dffa8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    '& h1, h2': {
      textShadow: '0 0 10px #8dffa8',
      // The next three styles create gradient text
      background: 'linear-gradient(to right, #E1FF31, #8dffa8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    background: 'linear-gradient(to right, #E1FF31, #8dffa8)',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '5px 13px',
  },
  pill: {
    background: 'linear-gradient(to right, #E1FF31, #8dffa8)',
    borderRadius: '20px',
    padding: '4px 6px',
    fontSize: '.6em',
  },
  name: {
    textShadow: '0 0 10px #8dffa8',
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
  },
  ingredients: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  },
  ingredient: {
    display: 'inline-block',
    listStyleType: 'none',
    position: 'relative',
    '&::before': {
      content: '\u2022' /* CSS Code for a bullet */,
      display: 'inline-block' /* Space between the bullet and the text */,
      width: '1.3em' /* Also needed for space */,
      marginLeft: '-1.3em' /* Also needed for space */,
    },
  },
  heading: {
    display: 'inline-block',
    margin: '20px 0',
  },
  direction: {
    display: 'inline-block',
    counterIncrement: 'list',
    listStyleType: 'none',
    position: 'relative',
    '&::before': {
      content: 'counter(list) "."',
      display: 'inline-block' /* Space between the number and the text */,
      width: '1.3em' /* Also needed for space */,
      marginLeft: '-1.3em' /* Also needed for space */,
    },
  },
})
