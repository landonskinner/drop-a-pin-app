import React, {useState} from 'react'
import PostContainer from './PostContainer'
import styled from 'styled-components'

function Search() {

    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(search)
    } 

    return (
        <div>
            <SearchStyle>
            <form>
                <p>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for posts by a title or username..."
                        value={search}
                        onChange={(e) => handleSearch(e)}
                    />
                </p>
            </form>
            </SearchStyle>
            <PostContainer search={search}/>
        </div>
    )
}

export default Search

const SearchStyle = styled.div`

    input {
        margin: auto;
        width: 50%;
        border: 2px solid white;
        border-bottom: 2px solid #afdfd4;
        border-radius: 10px;
        height: 40px;
        padding-left: 10px;
        font-family: Georgia;
    }

    button {
        display: inline-block;
        margin-bottom: 0px;
        margin-top: 5px;
        padding: 3px 10px 3px 10px;
        font-size: 16px;
        background: #afdfd4;
        border-radius: 20px;
        border: 2px solid #9fd0c1;
        font-family: Georgia, serif;
        cursor: pointer;

    }
`
