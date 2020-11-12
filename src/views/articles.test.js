import React from 'react';
import ReactDOM from 'react-dom';
import Articles from '../views/articles';

it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Articles/>, div);
});