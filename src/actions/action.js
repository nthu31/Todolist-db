import {
    listPosts as listPostsFromApi,
    listPostKeys as listPostKeysFromApi,
    createCategory as createCategoryFromApi,
    toggleImportant as toggleImportantFromApi,
    checkTodo as checkTodoFromApi,
    addTodo as addTodoFromApi,
    deleteTodo as deleteTodoFromApi,
    deleteCategory as deleteCategoryFromApi
} from 'api/todo.js';


const endGetCategory = (category, posts) => {
    return {
        type: '@END_GET_CATEGORY',
        category,
        posts
    };
};

const endGetCategoryKeys = (keys) => {
    return {
        type: '@END_GET_CATEGORY_KEYS',
        keys
    };
}

const endCreateCategory = (name) => {
    return {
        type: '@END_CREATE_CATEGORY',
        name
    };
}

const endToggleImportant = (id) => {
    return {
        type: '@END_TOGGLE_IMPORTANT',
        id
    };
}

const endCheckTodo = (id) => {
    return {
        type: '@END_CHECK_TODO',
        id
    };
}

const endAddTodo = (post) => {
    return {
        type: '@END_ADD_TODO',
        post
    }
}

const endDeleteTodo = (id) => {
    return {
        type: '@END_DELETE_TODO',
        id
    }
}

export const getCategory = (category) => {
    return (dispatch, state) => {
        listPostsFromApi(category)
            .then(data => {
                dispatch(endGetCategory(category, data));
            }).catch(err => {
                console.log(err);
            });
    };
};

export const getCategoryKeys = () => {
    return (dispatch, state) => {
        listPostKeysFromApi()
            .then(keys => {
                dispatch(endGetCategoryKeys(keys));
            }).catch(err => {
                console.log(err);
            });
    };
};

export const createCategory = (name) => {
    return (dispatch, state) => {
        createCategoryFromApi(name)
            .then(data => {
                dispatch(endCreateCategory(name));
            }).catch(err => {
                console.log(err);
            });
    };
};

export const importantToggle = (category, id) => {
    return (dispatch, state) => {
        toggleImportantFromApi(category, id)
            .then(posts => {
                dispatch(endToggleImportant(id));
            }).catch(err => {
                console.log(err);
            });
    };
}

export const checkTodo = (category, id) => {
    return (dispatch, state) => {
        checkTodoFromApi(category, id)
            .then(posts => {
                dispatch(endCheckTodo(id));
            }).catch(err => {
                console.log(err);
            });
    };
}

export const addTodo = (category, title, description = '', deadline = '', remark = '', important = false) => {
    return (dispatch, state) => {
        addTodoFromApi(category, title, description, deadline, remark, important).then(post => {
            dispatch(endAddTodo(post));
        }).catch(err => {
            console.log(err);
        })
    };
}

export const deleteTodo = (category, id) => {
    return (dispatch, state) => {
        deleteTodoFromApi(category, id)
            .then(data => {
                dispatch(endDeleteTodo(id));
            }).catch(err => {
                console.log(err);
            });
    };
}

export const deleteCategory = (name) => {
    return (dispatch, state) => {
        deleteCategoryFromApi(name)
            .then(data => {
                dispatch(getCategory('All'));
                dispatch(getCategoryKeys());
            }).catch(err => {
                console.log(err);
            });
    };
}
