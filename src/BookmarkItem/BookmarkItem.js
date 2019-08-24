import React from 'react';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';
import { Link } from 'react-router-dom';
import config from '../config'

const deleteBookmark = (id) => {

  fetch(`${config.API_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${config.API_KEY}`
    }
  }
  )
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error))
}

export default function BookmarkItem(props) {

  return (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <button ><Link to={`/edit/${props.id}`}>Edit Bookmark</Link>
        </button>
        {'  '}
        <button
          className='BookmarkItem__description'
          onClick={() => deleteBookmark(props.id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => { },
}
