import React, { useEffect, useState } from 'react';

function BlogPosts() { 
    const [posts, setPosts] = useState([]); //initialize state variable posts to an empty array - stored state & function//
    const [error, setError] = useState(null); //initialize state variable error to null//
    const [loading, setLoading] = useState(true); //initialize state variable loading to true//

    useEffect(() => { 
        const fetchPosts = async () => { //define async function to fetch posts//
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts'); //fetch data from API//
                if (!response.ok) { //check if response is ok//
                    throw new Error('Data fetching failed'); //throw error if not ok//
                }
                const data = await response.json(); //convert JSON to JavaScript object//
                setPosts(data); //set posts state with fetched data//
            } catch (error) { //catch errors occuring during fetch//
                setError(error); //set error state with caught error//
            } finally {
                setLoading(false); //set loading to false after fetching data or catching error//
            }
        };

        fetchPosts(); //call fetchPosts function to initiate fetch//
    }, []); //empty dependency array that runs effect only once when component renders//
 
}

export default BlogPosts;
