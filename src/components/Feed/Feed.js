import React, { useEffect, useState } from 'react'
import './Feed.css'
//database
import db from '../../utility/firebase'
//componets
import Post from '../Post/Post'

function Feed() {

const [posts, setPosts] = useState([])

useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
    return (
        <div className="Feed">
        {posts.map((post) =>(
            <Post 
                key={post.id}
                postId={post.id}
                profilePic={post.data.profilePic}
                user={post.data.user}
                photo={post.data.photo}
                title={post.data.title}
            />
        ))}
            <Post 
                key="123"
                postId= "123"
                profilePic="http://placeimg.com/640/480/animals"
                user="Agnieszka Kamińska"
                photo="http://placeimg.com/640/480/animals"
                title="Siema jestm ładnym zwierzaczkiem!"
            /> 
            <Post 
                key= "124"
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
