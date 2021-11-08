import React, { Component } from "react";
import axios from "../../axiosinstance";

export default class SinglePostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: null,
            description: null,
        }
    }
    /*** Get post details from Backend server. */
    getSinglePost(url) {
        axios.get(`${url}`)
            .then(response => {
                const object = response.data;
                if (Object.hasOwnProperty.call(object, "id", "title", "description")) {
                    this.setState({
                        id: object.id,
                        title: object.title,
                        description: object.description,
                    });
                }
            });
    }

    componentDidMount() {
        const getUrl = `/posts/${this.props.postsKey}/posts/${this.props.id - 1}.json`;
        this.getSinglePost(getUrl);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.id !== this.props.id) {
            const getUrl = `/posts/${this.props.postsKey}/posts/${this.props.id - 1}.json`;
            this.getSinglePost(getUrl);
        }
    }

    render() {
        const post = this.state;
        return (
            <div className='my-2 border border-gray-300 shadow p-4'>
                <div>Id: {post.id}</div>
                <div>Title: {post.title}</div>
                <div>Description: {post.description}</div>
            </div>
        );
    }
}