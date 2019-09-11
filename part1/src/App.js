import React, { useState } from 'react'
import Note from './Components/Note'
import axios from 'axios'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

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

    console.log('render', notes.length, 'notes');

    addNote = event => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        date: new Date(),
        important: Math.random() > 0.5,
      }
    
      axios
        .post('http://localhost:3001/notes', noteObject)
        .then(response => {
          setNotes(notes.concat(response.data))
          setNewNote('')
        })
    }

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
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>      
    </div>
  )


export default App