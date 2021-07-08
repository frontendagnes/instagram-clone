import React from 'react'
import './Feed.css'
//componets
import Post from '../Post/Post'

function Feed() {
    return (
        <div className="Feed">
            <Post 
                postId= "123"
                profilePic="http://placeimg.com/640/480/animals"
                user="Agnieszka Kamińska"
                photo="http://placeimg.com/640/480/animals"
                title="Siema jestm ładnym zwierzaczkiem!"
            /> 
            <Post 
                postId= "124"
                profilePic="http://placeimg.com/640/480/sports"
                user="AGNES"
                photo="http://placeimg.com/640/480/sports"
                title="Jestem bo jest a co Ci do tego :P"
            /> 
        </div>
    )
}

export default Feed
