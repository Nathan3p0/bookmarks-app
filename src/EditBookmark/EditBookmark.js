import React, { Component } from 'react'
import config from '../config'

const Required = () => (
    <span className='EditBookmark__required'>*</span>
)

class EditBookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: '',
            title: '',
            url: '',
            description: '',
            rating: 3
        }
    }

    componentDidMount() {
        const { bookmarkId } = this.props.match.params
        fetch(`${config.API_ENDPOINT}/${bookmarkId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    id: responseJson.id,
                    title: responseJson.title,
                    url: responseJson.url,
                    description: responseJson.description,
                    rating: responseJson.rating
                })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })

    }
    render() {
        const { error, title, url, description, rating } = this.state
        return (
            <section className='EditBookmark'>
                <h2>Edit Bookmark</h2>
                <form onSubmit=''>
                    <div className='EditBookmark__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='title'>
                            Title
                {' '}
                            <Required />
                        </label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='Great website!'
                            required
                            value={title}
                        />
                    </div>
                    <div>
                        <label htmlFor='url'>
                            URL
                {' '}
                            <Required />
                        </label>
                        <input
                            type='url'
                            name='url'
                            id='url'
                            placeholder='https://www.great-website.com/'
                            required
                            value={url}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            name='description'
                            id='description'
                            value={description}
                        />
                    </div>
                    <div>
                        <label htmlFor='rating'>
                            Rating
                {' '}
                            <Required />
                        </label>
                        <input
                            type='number'
                            name='rating'
                            id='rating'
                            value={rating}
                            min='1'
                            max='5'
                            required
                        />
                    </div>
                    <div className='EditBookmark__buttons'>
                        <button type='button' >
                            Cancel
                        </button>
                        {' '}
                        <button type='submit'>
                            Save
                        </button>
                    </div>

                </form>
            </section>
        );
    }
}

export default EditBookmark;
