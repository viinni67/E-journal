import React, { useState } from 'react'
import { useContext } from 'react'
import Context from '../context/NoteContext'

const AddNotes = () => {
    const context=useContext(Context);
    const{Addnote}=context
    const [note,setnote]=useState({title:" ",description:" ",tag:" "})

  const handleClick=(e)=>{
     console.log(localStorage.getItem('token'))
    e.preventDefault();
    Addnote(note.title,note.description,note.tag);

  }
  const Change=(e)=>{
    console.log("working....")
    setnote({...note,[e.target.name]:e.target.value})


  }

  return (
      <div>
          <div>
              <h2>add a note</h2>
              <form>
                  <div class="form-group my-3">
                      <label htmlfor="title">Title</label>
                      <input type="text" class="form-control" id="title" placeholder="Example input" name='title' onChange={Change}/>
                  </div>
                  <div class="form-group">
                    <label htmlfor="description">content </label>
                    <input type="text" className="form-control" id="description" placeholder="Another input" name='description' onChange={Change}/>
                </div>
                <div class="form-group">
                    <label htmlfor="description">tag </label>
                    <input type="text" className="form-control" id="tag" placeholder="Another input" name='tag' onChange={Change}/>
                </div>
                <button type='submit' className='btn btn-primary my-2' onClick={handleClick} id="checkAllTopicCheckBoxes">Add note </button>
            </form>
            <h3>your notes : </h3>
        </div>

    </div>
  )
}

export default AddNotes