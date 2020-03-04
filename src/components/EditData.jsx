import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
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

export default function EditData (props) {
  const [open, setOpen] = useState(props.show)
  const [name, setName] = useState(props.firstname)
  const [lastname, setLastname] = useState(props.lastname)
  const [email, setEmail] = useState('')
  const [id, setid] = useState(props.id)
  const classes = useStyles()

  useEffect(() => {
    setOpen(props.show)
  }, [props.show])

  useEffect(() => {
    setEmail(props.email)
  }, [props.email])

  useEffect(() => {
    setName(props.firstname)
  }, [props.firstname])

  useEffect(() => {
    setLastname(props.lastname)
  }, [props.lastname])

  useEffect(() => {
    setid(props.id)
  }, [props.id])

  const handleChangeName = event => {
    setName(event.target.value)
  }

  const handleChangeLastname = event => {
    setLastname(event.target.value)
  }

  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
    props.onShowChange(false)
  }

  const handleSubmit = () => {
    if (props.type === 'personas') {
      firebase.firestore().collection('personas').doc(id).update({
        firstname: name,
        lastname: lastname
      })
    }
    if (props.type === 'emails') {
      firebase.firestore().collection('emails').doc(id).update({
        email: email
      })
    }
    props.onShowChange(false)
  }

  const handleDelete = () => {
    if (props.type === 'personas') {
      firebase.firestore().collection('personas').doc(id).delete()
    }
    if (props.type === 'emails') {
      firebase.firestore().collection('emails').doc(id).delete()
    }
    props.onShowChange(false)
  }
  if (props.type === 'personas') {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='add-person'>Edit a Person</DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <TextField
                margin='dense'
                id='name'
                label='First Name'
                onChange={handleChangeName}
                value={name}
              />
              <TextField
                margin='dense'
                id='lastname'
                label='Last Name'
                onChange={handleChangeLastname}
                value={lastname}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleDelete} color='primary'>
              Delete
            </Button>
            <Button onClick={handleSubmit} color='primary'>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  } if (props.type === 'emails') {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='add-email'>Edit a Email</DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <TextField
                margin='dense'
                id='email'
                label='Email'
                type='email'
                onChange={handleChangeEmail}
                value={email}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleDelete} color='primary'>
              Delete
            </Button>
            <Button onClick={handleSubmit} color='primary'>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
