const initCategory = {
    category: 'All',
    posts: [],
    keys: []
};

export const categoryReducer = (state = initCategory, action) => {
    switch (action.type) {
        case '@END_GET_CATEGORY':
            return {
                category: action.category.charAt(0).toUpperCase() + action.category.slice(1),
                posts: action.posts,
                keys: state.keys
            };
        case '@END_GET_CATEGORY_KEYS':
            return Object.assign({}, state, {
                keys: action.keys
            });
        case '@END_TOGGLE_IMPORTANT':
            return Object.assign({}, state, {
                posts: state.posts.map(post => {
                    if(post.Id == action.id) {
                        return Object.assign({}, post, {
                            Important: !post.Important
                        });
                    }
                    return post;
                })
            });
        case '@END_CHECK_TODO':
            return Object.assign({}, state, {
                posts: state.posts.map(post => {
                    if(post.Id == action.id) {
                        return Object.assign({}, post, {
                            Done: true
                        });
                    }
                    return post;
                })
            });
        case '@END_ADD_TODO':
            return Object.assign({}, state, {
                posts: [...state.posts, action.post]
            });
        case '@END_DELETE_TODO':
            return Object.assign({}, state, {
                posts: state.posts.filter(post => {
                    if(post.Id == action.id) return false;
                    return true;
                })
            });
        case '@END_CREATE_CATEGORY':
            return Object.assign({}, state, {
                keys: [...state.keys, action.name]
            });
        default:
            return state;
    }
};
