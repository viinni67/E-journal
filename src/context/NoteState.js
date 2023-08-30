import React from "react";
import Context from "./NoteContext";
import { useState } from 'react'
const NoteState = (props) => {
  const host = 'http://localhost:3005'
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial);
  //get all notes

  const getNotes= async()=>{
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      }
    });
    const json=await response.json()
    console.log(json);
    setnotes(json)
    
    



  }


  //Add notes
  const Addnote = async(title, description, tag) => {
    //const url = `${host}/api/notes/addnote`
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')

      },

      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
    console.log("notes adding")
    setnotes(notes.concat(note))


  }
  //delete notes\
  const deleteNote = async(id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });
      //const json= response.json(); 
      // console.log(json);

    console.log("note deleted" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)

  }
  //edit notes
  const update = async (id, title, description, tag) => {
   
    // API Call 
    const response = await fetch(`${host}/api/notes/editNotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
    console.log("updating??")

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setnotes(newNotes);
  }

  return (
    <Context.Provider value={{ notes, Addnote, deleteNote, update ,getNotes}}>
      {props.children}
    </Context.Provider>
  )


}
export default NoteState;