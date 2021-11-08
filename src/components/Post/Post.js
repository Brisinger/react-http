import PropTypes from 'prop-types';

export function Post(props) {
    return (
        <div
            className='mx-2 my-1 p-2 border shadow border-gray-500 bg-gray-100 flex-1'
            onClick={props.postClicked}>
            <div>Id: {props.post.id}</div>
            <div>Title: {props.post.title}</div>
            <div>Description: {props.post.description}</div>
            <div className='text-right'>
                <button
                    className='bg-red-400 text-white px-2 py-1 rounded-full'
                    onClick={props.postDeleted}>
                    Delete Post
                </button>
            </div>
        </div>
    );
}

Post.defaultProps = {
    post: {
        id: -1,
        title: 'Unavailable',
        description: 'Unavailable',
    },
}

Post.propTypes = {
    postClicked: PropTypes.func,
    post: PropTypes.exact({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
    }),
};