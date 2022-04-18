import React, { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  startAfter,
  endBefore,
  query,
} from 'firebase/firestore'
import { css } from 'glamor'
import { useLocation } from 'wouter'

import { db, COLLECTIONS } from '../utils/firebase'
import { RecipeButton } from '../components/RecipeButton'

export const Recipes = () => {
  const [_, setLocation] = useLocation() // eslint-disable-line no-unused-vars
  const [recipes, setRecipes] = useState([])
  const [startDoc, setStartDoc] = useState(null)
  const [last, setLast] = useState(null)
  const styles = getStyles()
  const recipesPerPage = 4

  useEffect(() => {
    const collectionRef = query(
      collection(db, COLLECTIONS.RECIPES_BAKING),
      orderBy('name'),
      limit(recipesPerPage),
    )

    getDocs(collectionRef).then((snapshots) => {
      const newRecipes = []

      snapshots.forEach((doc) => newRecipes.push({ id: doc.id, ...doc.data() }))

      setStartDoc(snapshots.docs[0].id)
      setLast(snapshots.docs[snapshots.docs.length - 1])
      setRecipes(newRecipes)
    })
  }, [])

  const getPrev = () => {
    const next = query(
      collection(db, COLLECTIONS.RECIPES_BAKING),
      orderBy('name'),
      limit(recipesPerPage),
      endBefore(last),
    )

    getDocs(next).then((snapshots) => {
      const newRecipes = []

      snapshots.forEach((doc) => newRecipes.push({ id: doc.id, ...doc.data() }))

      setLast(snapshots.docs[snapshots.docs.length - 1])
      setRecipes(newRecipes)
    })
  }
  const getMore = () => {
    const next = query(
      collection(db, COLLECTIONS.RECIPES_BAKING),
      orderBy('name'),
      limit(recipesPerPage),
      startAfter(last),
    )

    getDocs(next).then((snapshots) => {
      const newRecipes = []

      snapshots.forEach((doc) => newRecipes.push({ id: doc.id, ...doc.data() }))

      setLast(snapshots.docs[snapshots.docs.length - 1])
      setRecipes(newRecipes)
    })
  }

  if (recipes.length === 0) {
    return (
      <div className={css(styles.container)}>
        <h1 style={styles.loading}>Loading...</h1>
      </div>
    )
  }

  return (
    <div className={css(styles.container)}>
      {recipes[0].id !== startDoc && (
        <button className={css(styles.navButton)} onClick={getPrev}>
          <p>PREV</p>
        </button>
      )}
      {recipes.map((recipe) => (
        <RecipeButton
          key={recipe.id}
          onClick={() => setLocation(`/recipes/${recipe.id}`)}
          recipe={recipe}
        />
      ))}
      {recipes.length === 3 && (
        <button className={css(styles.navButton)} onClick={getMore}>
          <p>MORE</p>
        </button>
      )}
    </div>
  )
}

const getStyles = () => ({
  container: {
    display: 'flex',
    height: '100%',
    '@media(max-width: 768px)': {
      flexDirection: 'column',
      height: '100%',
    },
  },
  navButton: {
    background: 'transparent',
    borderStyle: 'none',
    cursor: 'pointer',
    height: '100%',
    padding: '0',
    flex: 1,
    maxWidth: '50px',
    '&:hover': {
      background: '#232323',
    },
    '& p': {
      // The next three styles create gradient text
      background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '1.5em',
      fontWeight: '900',
      margin: '0',
      padding: '0 10px',
      textOrientation: 'upright',
      writingMode: 'vertical-rl',
      '@media(max-width: 768px)': {
        writingMode: 'initial',
      },
    },
    '@media(max-width: 768px)': {
      height: 'initial',
      padding: '10px 0',
      maxHeight: '50px',
      maxWidth: 'initial',
      width: '100%',
    },
  },
  loading: {
    // The next three styles create gradient text
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginTop: 0,
  },
  description: {
    // The next three styles create gradient text
    background: 'linear-gradient(to right, #E1FF31, #8DFFA8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
})
