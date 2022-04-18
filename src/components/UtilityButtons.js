import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'wouter'

const positions = ['left', 'right']

export const UtilityButtons = (props) => {
  const { buttons, position = 'left' } = props
  const [open, toggleOpen] = useState(false)
  const [location, setLocation] = useLocation() // eslint-disable-line no-unused-vars
  const drawerRef = useRef()
  const styles = getStyles()
  console.log('location', location)

  useEffect(() => {
    // Temporary not of position prop:
    if (position) {
      console.warn('Position support coming soon. Defaulting to "left".')
    }
    // if (!positions.includes(position)) {
    //   console.error('Position Error: Please choose from ["left", "right"]')
    // }
  }, [position])

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        drawerRef.current.style.transform = 'translate(0px, 0px)'
        toggleOpen(false)
      }, 2000)
    }
  }, [open])

  if (!positions.includes(position)) {
    return <p style={styles.error}>Position Error</p>
  }

  return (
    <div style={styles.drawer} ref={drawerRef}>
      <div
        style={styles.drawHandle}
        className="handle"
        onClick={() => {
          toggleOpen(!open)
          drawerRef.current.style.transform = `translate(0px, ${open ? '0' : '-75px'})`
        }}
      >
        {open ? (
          <FontAwesomeIcon icon={faAngleDoubleDown} style={styles.buttonHelper} />
        ) : (
          <FontAwesomeIcon icon={faAngleDoubleUp} style={styles.buttonHelper} />
        )}
      </div>
      {buttons.map((button, i) => (
        <div
          key={i}
          onClick={() => setLocation(button.path)}
          style={{
            ...styles.homeButton,
            background: button.color ?? 'slategrey',
            boxShadow: location === button.path ? '0px 0px 10px black' : 'none',
          }}
        >
          {button.content}
        </div>
      ))}
    </div>
  )
}

const getStyles = () => ({
  error: {
    color: 'red',
    fontWeight: 'bolder',
    position: 'fixed',
    top: '10px',
    left: '45%',
  },
  drawer: {
    background: 'slategrey',
    height: '75px',
    position: 'fixed',
    bottom: '-75',
    width: '100%',
    transition: 'transform .5s',
    // Flexbox
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  drawHandle: {
    background: 'slategrey',
    borderRadius: '5px 5px 0 0',
    color: 'white',
    padding: '13px 35px',
    position: 'absolute',
    top: '-26px',
    left: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    borderRadius: '15px',
    color: 'white',
    cursor: 'pointer',
    height: '60px',
    width: '70px',
    // Flexbox
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    userSelect: 'none',
  },
  buttonHelper: {
    position: 'absolute',
    fontWeight: 'bold',
  },
})
