import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonIcon from '@material-ui/icons/Person'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import EditData from '../EditData'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}))

export default function Sidebar (props) {
  const classes = useStyles()
  const [show, setShow] = useState(false)
  const [name, setname] = useState('')
  const [lastname, setlastname] = useState('')
  const [id, setid] = useState('')
  const [email, setemail] = useState('')
  function openEdit (data) {
    if (props.type === 'personas') {
      setname(data.firstname)
      setlastname(data.lastname)
      setid(data.id)
      setShow(true)
    }
    if (props.type === 'emails') {
      setemail(data.email)
      setid(id)
      setShow(true)
    }
  }

  function onShowChange (show) {
    setShow(show)
  }

  if (props.data.data && props.type === 'personas') {
    return (
      <div className={classes.root}>
        <EditData
          show={show}
          type='personas'
          onShowChange={onShowChange}
          firstname={name}
          lastname={lastname}
          id={id}
        />
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {props.data.data.map((doc, index) => (
              <ListItem
                button
                key={doc.id}
                onClick={() => {
                  openEdit({
                    firstname: doc.data.firstname,
                    lastname: doc.data.lastname,
                    id: doc.id
                  })
                }}
              >
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary={doc.data.firstname + ' ' + doc.data.lastname} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  } if (props.emails.emails && props.type === 'emails') {
    return (
      <div className={classes.root}>
        <EditData
          show={show}
          type='emails'
          onShowChange={onShowChange}
          email={email}
          id={id}
        />
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {props.emails.emails.map((doc, index) => (
              <ListItem
                button
                key={doc.id}
                onClick={() => {
                  openEdit({
                    email: doc.data.email,
                    id: doc.id
                  })
                }}
              >
                <ListItemIcon><AlternateEmailIcon /></ListItemIcon>
                <ListItemText primary={doc.data.email} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List />
          <Divider />
        </Drawer>
      </div>
    )
  }
}
