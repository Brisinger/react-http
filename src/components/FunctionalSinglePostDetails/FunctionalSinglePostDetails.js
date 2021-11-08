import { useState, useEffect } from "react";
import axios from "../../axiosinstance";

export function FunctionalSinglePostDetails(props) {
    const [post, setPost] = useState({
        id: null,
        title: null,
        description: null,
    });

    useEffect(
        () => {
            const getUrl = `/posts/${props.postsKey}/posts/${props.id}.json`;
            getSinglePost(getUrl);
        },
        []
    );

    useEffect(
        () => {
            const getUrl = `/posts/${props.postsKey}/posts/${props.id}.json`;
            getSinglePost(getUrl);
        },
        [props.id]
    );

    /*** Get post details from Backend server. */
    function getSinglePost(url) {
        axios.get(`${url}`)
            .then(response => {
                const object = response.data;
                if (Object.hasOwnProperty.call(object, "id", "title", "description")) {
                    setPost({
                        id: object.id,
                        title: object.title,
                        description: object.description,
                    });
                }
            });
    };

    return (
        <div className='mx-2 my-1 p-2 border shadow border-gray-500 bg-gray-100'>
            <div>Id: {post.id}</div>
            <div>Title: {post.title}</div>
            <div>Description: {post.description}</div>
        </div>
    );
}