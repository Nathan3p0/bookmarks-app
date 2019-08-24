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

    handleSubmit = (event) => {
        event.preventDefault();

        const bookmark = {
            id: this.state.id,
            title: this.state.title,
            url: this.state.url,
            description: this.state.description,
            rating: this.state.rating
        }

        fetch(`${config.API_ENDPOINT}/${bookmark.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookmark)
        })
            .then(response => {
                
                if(response.status === 204) {
                    console.log('Success!!')
                    this.props.history.push('/')
                }
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
        
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name] : target.value
        })
    }

    render() {
        const { error, title, url, description, rating } = this.state
        return (
            <section className='EditBookmark'>
                <h2>Edit Bookmark</h2>
                <form onSubmit={this.handleSubmit}>
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
                            onChange={this.handleInputChange}
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
                            onChange={this.handleInputChange}
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
                            onChange={this.handleInputChange}
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
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className='EditBookmark__buttons'>
                        <button type='button' onClick={this.props.history.goBack}>
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
