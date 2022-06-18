let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')






const Text = document.getElementById("text");
const err = document.getElementById("err")
const spin = document.getElementById("notice")

let postBox = [];
let URL = "https://jsonplaceholder.typicode.com/posts"


function renderUI (arr) {
    let postHolder = '';
            arr.forEach(post => {
                postHolder += `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <p>${post.id}</p>
                                <h6 class="post-title">${post.title}</h6>
                                <p class="post-body">${post.body.slice(0, 60)}...........</p>
                                <div class="d-flex justify-content-evenly">
                                    <button class="btn btn-success" id="view-btn" onclick="openSingle(${post.id})">read</button>
                                    <button class="btn btn-primary updatebtn" onclick="updatePost(${post.id})">Update</button>
                                    <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
           
            postWrapper.innerHTML = postHolder;       

}



const CustomFetchData = async (url, method, body) => {
    const controller = new AbortController()
    
    try {
        const response = await fetch(url, {
            method: method,
            headers : {
               'Content-type': "application/json"
            },
            body: body,
            signal: controller.signal 
        })

        if (!response.ok) {
            throw new error()
        }
        const json = await response.json()
        const data = await json
        return data
        

    } catch { 
        setTimeout(() => {
            spin.style.display = "none"
            err.textContent = "Sorry there is an error on the request please check your network connection and reload page."
        }, 3000)
    } finally {
        setTimeout(() => controller.abort(), 5000);
      }

}



// getdata
const getPosts = () => {
    setTimeout(async() => {
        let alldatas =await CustomFetchData(URL)
        postBox = alldatas
       renderUI(postBox)
       Text.textContent = "What our customers are saying"
       spin.style.display = "none"
       err.style.display = "none"
       body.value = ""
        title.value = ""
    }, 3000);

   }
   
   getPosts()




// post data

postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let  bodyy = JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2,
            id: postBox.length + 1,
        })
    const postPosts = async() => {
            let data = await CustomFetchData(URL, method = "POST", body = bodyy )
            postBox.unshift(data);
            renderUI(postBox)         
            body.value = ""
            title.value = ""
         }
         postPosts()
 
    })
            

// update post
    const updatePost = async(id) => {
    

          let  bodyy = JSON.stringify({
                id: id,
                title: title.value,
                body: body.value,
                userId: 1,
            })
            let data = await CustomFetchData(`${URL}/${id}`, method = "PUT", body = bodyy )
            let postTitles = document.querySelectorAll('.post-title') // 100 post titles [0 -99]
            let postBodies = document.querySelectorAll('.post-body')
        
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })
            title.value = ""
            body.value = ""
}



// view post

const openSingle = async(id) => {
 
    let data =await CustomFetchData(`${URL}/${id}`)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'single.html'
        
}


// delete post
const deletePost = async(id) => {

        let data = await CustomFetchData(`${URL}/${id}`, method = "POST" )
            postBox = postBox.filter(post => post.id !== id)
            renderUI(postBox)  


}



