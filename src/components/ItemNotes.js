import React from 'react'
import { useContext } from 'react';
import Context from '../context/NoteContext';
const ItemNotes = (props) => {
  const context=useContext(Context);
    const{deleteNote}=context
    const {note,updateNote}=props
 
  return (
 
    <div className='col-md-3'>
        <div class="card my-3">
        <div class="card-body">
            <h5 class="card-title">{note.title}</h5>
            <p class="card-text">{note.description}</p>
            <p class="card-text">{note.tag}</p>
            <i class="fa-solid fa-pen-to-square mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(note)}}></i>
            <i class="fas fa-eraser"  onClick={()=>{deleteNote(note._id)}}></i>
        </div>
    </div>
    </div>

  )
}

export default ItemNotes