import React from 'react';
import Form from 'react-bootstrap/Form'
import '../InfoBar/styles/search.css'
const Search = () => {
    return (
        <Form.Control type="text" placeholder="search" className="search-style" />
    );
};

export default Search;