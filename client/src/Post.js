import React from 'react'
import styled from 'styled-components'

function Post() {
    return (
        <PostStyle>
            <img src="" />
            <h1>Title</h1>
            <h3>author</h3>
            <p>
                text
            </p>
        </PostStyle>
    )
}

export default Post

const PostStyle = styled.div`
    background: #f3eedb;
    padding: 10px;
    width: 50%;
    margin: auto;
    margin-top: 25px;
    margin-bottom: 25px;
    border-radius: 5px;
    border: 5px solid #afdfd4;
    box-shadow: 0 0 0 10px #f3eedb;

`