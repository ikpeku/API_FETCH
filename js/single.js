function renderSingle() {
    let newObject = localStorage.getItem('viewedPost')
    console.log(newObject);
    let post = JSON.parse(newObject)
 
    document.getElementById('post-id').innerHTML = post.id
    document.getElementById('post-title').innerHTML = post.title
    document.getElementById('post-body').innerHTML = post.body
}

renderSingle();