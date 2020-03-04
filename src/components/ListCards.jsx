import React from 'react'
import CardData from './CardData'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  list: {
    position: 'fixed',
    left: '250px',
    top: theme.spacing(10)
  }
}))

export default function ListCards (props) {
  const classes = useStyles()
  return (
    <div className={classes.list}>
      <Grid container spacing={2} style={{ padding: 24 }}>
        {
          props.collections.map((collection) => {
            return (
              <Grid item xs={12} sm={6} lg={4} xl={4} key={collection.name}>
                <CardData
                  name={collection.name}
                  description={collection.description}
                  onTypeChange={props.onTypeChange}
                />
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  )
}
