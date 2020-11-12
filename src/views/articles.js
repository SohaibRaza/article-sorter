import React, { useEffect } from 'react';
import data from '../constants/data.json';
import { sortBy } from '../utils';


const initialState = {
    articles: [],
}

/**
 *
 * @param {*} state -> current state
 * @param {*} action -> action to perform. action contains
 * "type (type of action)" & "payload (data sent with the action to update state)"
 */
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ARTICLES':
            return {
                ...state,
                articles: action.payload,
            }
        default:
            return state;
    }
};

function Articles() {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    /**
     *
     * @param {String} sortby - parameter by which you want to sort items
     */
    const handleSort = (sortby) => {
        const sorted = sortBy(data, {
            prop: `${sortby}`,
            desc: true,
        });
        dispatch({
            type: 'SET_ARTICLES',
            payload: sorted
        })
    };

    useEffect(() => {
        const sorted = sortBy(data, {
            prop: "upvotes",
            desc: true,
        });
        dispatch({
            type: 'SET_ARTICLES',
            payload: sorted
        })
    }, []);

    return (
        <div className="container">
            <h1 className="heading">Articles</h1>
            <div>
                <button className="btn btn-primary mr-4" onClick={ () => handleSort('date') } >Most Recent</button>
                <button className="btn btn-success"onClick={ () => handleSort('upvotes') } >Most Upvoted</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Upvotes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.articles ? state.articles.map(article => {
                            return (
                                <tr key={article.id} >
                                    <td>{article.title}</td>
                                    <td>{article.date}</td>
                                    <td>{article.upvotes}</td>
                                </tr>
                            )
                        }): null
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Articles;