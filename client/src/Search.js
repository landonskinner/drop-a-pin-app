import React, {useState} from 'react'
import PostContainer from './PostContainer'

function Search() {

    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(search)
    } 

    return (
        <div>
            <form>
                <p>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for posts by title..."
                        value={search}
                        onChange={(e) => handleSearch(e)}
                    />
                </p>
            </form>
            <PostContainer search={search}/>
        </div>
    )
}

export default Search
