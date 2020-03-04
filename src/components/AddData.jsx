import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { firebase } from '../firebase'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    },
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

export default function AddData (props) {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const classes = useStyles()

  const handleChangeName = event => {
    setName(event.target.value)
  }

  const handleChangeLastname = event => {
    setLastname(event.target.value)
  }

  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (props.type === 'personas') {
      firebase.firestore().collection('personas').add({
        firstname: name,
        lastname: lastname
      })
    }
    if (props.type === 'emails') {
      firebase.firestore().collection('emails').add({
        email: email
      })
    }
    setOpen(false)
  }
  if (props.type === 'personas') {
    return (
      <div>
        <Fab className={classes.fab} color='primary' aria-label='add' onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='add-person'>Add a Person</DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <TextField
                margin='dense'
                id='name'
                label='First Name'
                onChange={handleChangeName}
              />
              <TextField
                margin='dense'
                id='lastname'
                label='Last Name'
                onChange={handleChangeLastname}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSubmit} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  } if (props.type === 'emails') {
    return (
      <div>
        <Fab className={classes.fab} color='primary' aria-label='add' onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='add-email'>Add a Email</DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <TextField
                margin='dense'
                id='email'
                label='Email'
                type='email'
                onChange={handleChangeEmail}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleSubmit} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
