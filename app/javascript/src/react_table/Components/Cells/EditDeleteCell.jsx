import React from 'react'

export default function (editHandler, deleteHandler) {
  return function ({ original }) {
    if (!original.links) { return false }

    return (
      <div className='text-center'>
        { original.links.edit &&
          <a className='edit-button' href={original.links.edit}><span className='fa fa-pencil fa-fw' onClick={editHandler && editHandler(original.id)} /></a>
        }
        { original.links.delete &&
          <span className='delete-button fa fa-trash fa-fw' onClick={deleteHandler(original.id)} />
        }
      </div>
    )
  }
}
