import axios from 'axios';

const baseUrl = 'http://localhost:7070/api';

export function listPosts(category) {
    let url = `${baseUrl}/lists?category=${category}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(res => {
        if(res.status != 200) {
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    });
}

export function listPostKeys() {
    let url = `${baseUrl}/keys`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(res => {
        if(res.status != 200) {
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })
}

export function createCategory(name) {
    let url = `${baseUrl}/posts/category/${name}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(res => {
        if(res.status != 200) {
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    });
}

export function addTodo(category, title, description = '', deadline = '', remark = '', important = false) {
    let url = `${baseUrl}/posts/todo`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        category,
        title,
        description,
        deadline,
        remark,
        important
    }).then(res => {
        if(res.status != 200) {
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    });
}

export function checkTodo(category, id) {
    let url = `${baseUrl}/posts/check`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        category,
        id
    }).then(res => {
        if(res.status != 200) {
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })
}

export function toggleImportant(category, id) {
    let url = `${baseUrl}/posts/important`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        category,
        id
    }).then(res => {
        if(res.status != 200) {
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })
}

export function deleteTodo(category, id) {
    let url = `${baseUrl}/posts/delete`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        category,
        id
    }).then(res => {
        if(res.status != 200) {
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })
}

export function deleteCategory(name) {
    let url = `${baseUrl}/posts/deleteCategory/${name}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(res => {
        if(res.status != 200) {
            throw new Error(`Unexpected response code: ${res.status}`);
        }
        return res.data;
    })
}
