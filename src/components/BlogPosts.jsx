import React, { useEffect, useState } from 'react';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        

        if (!response.ok) {
          throw new Error('Unable to retrieve posts');
        }

        const data = await response.json();
        setPosts(data);
        setLoading(false); 
      } catch (err) {
        setError(err.message);
        setLoading(false);  
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <p style={{ color: 'green' }}>Loading...</p>
      </div>
    ) 
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red'}}>Error: {error}</p>
        <img src="./images/error-message.png" alt="Error" />
      </div>
    );
  }

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}

export default BlogPosts;
