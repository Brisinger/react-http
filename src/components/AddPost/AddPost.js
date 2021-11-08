import { useState } from "react"
import axios from "../../axiosinstance";

export function AddPost(props) {
    const [post, setPost] = useState({});

    function onCreatePost(e) {
        e.preventDefault();
        console.log(post);
        const postUrl = `/posts/${props.postsKey}/posts.json`;
        const updateUrl = `/posts/${props.postsKey}/count.json`;
        AddSinglePost(postUrl);
        UpdatePostCount(updateUrl)
    }

    /*** Get post details from Backend server. */
    function AddSinglePost(url) {
        axios.post(`${url}`, post)
            .then(response => {
                const object = response.data;
                const getUrl = '/posts.json';
                console.log(object);
                props.onPostAdded(getUrl);
            });
    };

    function UpdatePostCount(url) {
        axios.put(url, props.maxId + 1).then(response => {
            const object = response.data;
            console.log('Updated post count: ' + object);
        });
    }

    return (
        <div>
            <h1 className='font-bold text-2xl'>Create Post</h1>
            <form onSubmit={onCreatePost}>
                <div className='mb-3'>
                    <label className='block'>Title:</label>
                    <input type='text'
                        className='border border-gray-400 p-1 w-1/2'
                        onChange={(e) => setPost({ title: e.target.value })}
                        placeholder='Title' />
                </div>
                <div className='mb-3'>
                    <label className='block'>Description:</label>
                    <textarea
                        className='border border-gray-400 p-1 w-1/2'
                        onChange={(e) => setPost({ id: props.maxId + 1, title: post.title, description: e.target.value })}
                        placeholder='Description' />
                </div>
                <div className='mb-3'>
                    <button type='submit' className='bg-purple-500 px-3 py-1 text-white rounded-full'>Create Post</button>
                </div>
            </form>
        </div>
    );
}