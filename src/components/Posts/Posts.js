import { Component } from "react";
import { Post } from "../Post/Post";
import axios from "../../axiosinstance";
import SinglePostDetails from "../SinglePostDetails/SinglePostDetails";
import { FunctionalSinglePostDetails } from "../FunctionalSinglePostDetails/FunctionalSinglePostDetails";
import { AddPost } from "../AddPost/AddPost";

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            postTitle: null,
            posts: [],
            showPosts: false,
            selectedPostId: null,
            isAddPost: false,
        };
        this.postsKey = null;
    }

    getPostHandler = (url) => {
        this.setState({
            isAddPost: false,
        });
        axios.get(url).then(response => {
            const object = response.data;
            for (const key in object) {
                if (Object.hasOwnProperty.call(object, key)) {
                    this.setState({
                        count: Object.keys(object[key].posts).length,
                        postTitle: object[key].postTitle,
                        posts: object[key].posts,
                        showPosts: object[key].showPosts,
                    });
                }
            }
            this.postsKey = Object.keys(object)[0];
            console.log(this.postsKey);
            console.log(`Posts count: ${this.state.count}`);
        });
    }

    componentDidMount() {
        const getUrl = '/posts.json';
        this.getPostHandler(getUrl);
    }

    onPostDeleteHandler = (id, e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete."))
        {
            const delUrl = `/posts/${this.postsKey}/posts/${id}.json`;
            const getUrl = '/posts.json';
            const updateUrl = `/posts/${this.postsKey}/count.json`;
            axios.delete(delUrl).then(response => {
                this.getPostHandler(getUrl);
                console.log(response);
            });
            this.updatePostCount(updateUrl);
        }
    }

    onPostClickHandler = (id, e) => {
        e.preventDefault();
        console.log(id);
        this.setState(
            {
                selectedPostId: id,
            }
        );
    }

    onAddPostHandler = (e) => {
        e.preventDefault();
        this.setState({
            isAddPost: true,
        });
    }

    getPost = () => {
        let post = [];
        for (const key in this.state.posts) {
            post.push(
                <Post
                    key={key}
                    postClicked={this.onPostClickHandler.bind(this, key)}
                    postDeleted={this.onPostDeleteHandler.bind(this, key)}
                    post={this.state.posts[key]} />
            );
        }
        return post;
    }

    getAddPost = () => {
        let max = this.state.count;
        return (
            <AddPost
                maxId={max}
                postsKey={this.postsKey}
                onPostAdded={this.getPostHandler} />
        );
    }

    updatePostCount(url) {
        axios.put(url, this.state.count - 1).then(response => {
            const object = response.data;
            console.log('Updated post count: ' + object);
        });
    }

    render() {
        const postsDetails = this.getPost();
        return (
            <div>
                <div className='flex'>
                    <div className='w-3/4 mr-3'>
                        <div className='flex items-center justify-between'>
                            <h1 className="font-bold text-xl my-3">{this.state.postTitle}</h1>
                            <button
                                className='bg-blue-600 text-white px-2 py-1 items-center '
                                onClick={this.onAddPostHandler}>Create Post</button>
                        </div>
                        <div className='flex flex-wrap my-1 w-4/5'>
                            {postsDetails && postsDetails}
                        </div>
                    </div>
                    {this.state.selectedPostId && (
                        <div className='w-1/4 mt-5'>
                            <h2 className='font-bold text-2xl'>Post details</h2>
                            {/* <SinglePostDetails id={this.state.selectedPostId} postsKey={this.postsKey}/> */}
                            <FunctionalSinglePostDetails id={this.state.selectedPostId} postsKey={this.postsKey} />
                        </div>
                    )}
                </div>
                {this.state.isAddPost && (
                    <div className='my-3'>
                        {this.getAddPost()}       
                    </div>
                )}
            </div>
        );
    }
}