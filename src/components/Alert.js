import React from 'react'

const Alert = (props) => {
//     setTimeout((props) => {
//         {props}
      
//   }, 1500);
  return (
    <div className="alert alert-danger" role="alert">
        {props.msg},{props.type}
    </div>
  )
}

export default Alert