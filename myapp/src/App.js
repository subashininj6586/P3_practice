import React, { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'

const App = (props) => {
  

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...') 
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  const toggleImportanceOf = id => {
    
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }
  
  /*useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])

  console.log('render', notes.length, 'notes')*/
const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])
  
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    //  id: notes.length + 1,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

 /* const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
  }*/
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

    const Note = ({ note, toggleImportance }) => {
      const label = note.important
        ? 'make not important' : 'make important'
    
      return (
        <li>
          {note.content} 
          <button onClick={toggleImportance}>{label}</button>
        </li>
      )
    }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>  
      <ul>
          {notesToShow.map(note =>
          <Note key={note.id} note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form> 
    </div>
  )
}
export default App