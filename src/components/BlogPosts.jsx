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
          throw new Error('Failed to fetch posts');
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
    return <p>Loading...</p>;  
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>Error: {error}</p>
        {/* Optionally, display an error image */}
        <img src="./errorImage.png" alt="Error" />
      </div>
    );
  }

  return (
    <div>
      {posts.map(post => (
        <article key={post.id} style={{ marginBottom: '1rem' }}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}

export default BlogPosts;
