import React, { useEffect, useState } from "react";
import "./Feed.css";
//database
import db, {collection, query, orderBy, onSnapshot } from "../../utility/firebase";
//componets
import Post from "../Post/Post";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ref = collection(db, "posts")
    const refSort = query(ref, orderBy("timestamp", "desc"))
    const unsuscribe = onSnapshot(refSort, (snapshot) =>{
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    })
    return() =>{
      unsuscribe()
    }
  }, []);
  
  return (
    <div className="feed">
      {posts.map((post) => (
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
  );
}

export default Feed;
