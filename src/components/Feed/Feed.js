import React, { useEffect, useState } from 'react'
import './Feed.css'
//database
import db from '../../utility/firebase'
//componets
import Post from '../Post/Post'

function Feed() {

const [posts, setPosts] = useState([])

useEffect(() => {
  let feedback
  feedback = db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      return () => {
        feedback();
      };
  }, []);
    return (
        <div className="Feed">
        {posts.map((post) =>(
            <Post 
                key={post.id}
                postId={post.id}
                profilePic={post.data.profilePic}
                username={post.data.user}
                photo={post.data.photo}
                title={post.data.title}
                favorite={post.data.likes}
                timestamp={post.data.timestamp}
            />
        ))}
        </div>
    )
}

export default Feed
