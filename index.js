
const err = document.getElementById("err")
const spin = document.getElementById("notice")
const postCard = document.querySelector(".post-listing")
const LatestPostCard = document.getElementById(".latest-post-listing")
const addPost = document.getElementById("add-post-form")

const Text = document.getElementById("text");
const getTitle = document.getElementById("postTitle");
const getText = document.getElementById("floatingTextarea2");
const btnPress = document.querySelector(".btn");

const deletebtn = document.querySelector(".endelete")




const URL = "https://jsonplaceholder.typicode.com/posts"

let newDate = document.lastModified


function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }


const d = new Date(document.lastModified);
let h = addZero(d.getHours());
let m = addZero(d.getMinutes());
let s = addZero(d.getSeconds());
let time = h + " : " + m + " : " + s;

let PostDatas = []

const renderPost = (datas) => {
    let singleData = ""
    datas.map(data => {
        PostDatas.unshift(
            singleData =  `
        <div class="card mx-2">
            <div class="card-body h-100" data-id=${data.id}>
                <h5 class="card-title">${data.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">updated ${newDate}</h6>
                <p class="card-text">${data.body}</p>
                <div class="card-footer">
                    <small class="text-muted d-flex justify-content-center">
                        <a href="#" class="card-link fs-6 text-decoration-none endelete" id=${data.id}>Delete</a>
                        <a href="#" class="card-link fs-6 text-decoration-none enedit" id=${data.id}>Edit</a>
                        <a href="./post.html" class="card-link fs-6 text-decoration-none enview" id=${data.id}>View</a>
                    </small>
                </div>
            </div>
        </div>`)

    });
    postCard.innerHTML = PostDatas
}

console.log(PostDatas)
//                      
//                        
//                              <a href="#" class="card-link fs-5 text-decoration-none" id="delete-post">Delete</a>
//                              <a href="#" class="card-link fs-5 text-decoration-none" id="edit-post">Edit</a>
//                              <a href="./post.html" class="card-link fs-5 text-decoration-none" id="view-post">View</a>
//                        
//                      








// custom fetch


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
        const datas = await json
        return datas
        

    } catch { 
        setTimeout(() => {
            spin.style.display = "none"
            err.textContent = "Sorry there is an error on the request please check your network connection and reload page."
        }, 3000)
    } finally {
        setTimeout(() => controller.abort(), 5000);
      }

}


// get data
const getPosts = async() => {
 let alldatas =await CustomFetchData(URL)
        renderPost(alldatas)
        Text.textContent = "What our customers are saying"
        spin.style.display = "none"
        err.style.display = "none"
}

getPosts()



// post data 
addPost.addEventListener("submit", (e) => {
    e.preventDefault()
    let body = JSON.stringify({
        title: getTitle.value,
        body: getText.value,
        id: Math.random(),
        userId: 2,
    })
    const postPosts = async() => {
       let post = await CustomFetchData(URL, method = "POST", body = body )
        console.log("successful")
        const dataArr = []
            dataArr.unshift(post)
            renderPost(dataArr)
            
            getTitle.value = ""
            getText.value = ""
    }
    postPosts()
})




//updata a  post

postCard.addEventListener("click", (e) => {
    e.preventDefault()

    let deleteHandler = e.target.id
    let editHandler = e.target.id
    let viewHandler = e.target.id
    let idget = e.target.parentElement.dataset.id;
    console.log(deleteHandler)
// Handle delete

   
        fetch(`${URL}/${deleteHandler}`, {
            method: 'DELETE',
        }).then(res => res.json())

        .then(data => {
       let NewData = []
       PostDatas = PostDatas.filter((item, index) => {
        item.id !== deleteHandler,
        renderPost(PostDatas)
       }
            
        )})
        
    


        // .then((response) => response.json())
        // .then((data) => {
        //     console.log(data)
        //     postBox = postBox.filter(post => post.id !== id)
        //     console.log(postBox)
           
        //     renderUI(postBox)  
        // })
    


    if(editHandler){
        let parent = e.target.parentElement
        console.log(parent)
        let cardTitle = document.querySelector(".card-title").textContent
        let cardBody = document.querySelector(".card-text").textContent
        getTitle.value = cardTitle
        getText.value = cardBody

        btnPress.addEventListener("click", () => {
            console.log("button press")
        })


    }

})






