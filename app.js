// document.addEventListener('DOMContentLoaded', function() {
let all_product;
async function fetch_functor(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// call all catagories

async function set_catagories_button() {
    let data_array = await fetch_functor('https://openapi.programming-hero.com/api/videos/categories');
    data = data_array.data;
    get_catagories(data[0].category_id);

    const catagoriesButtonsContainer = document.getElementById('catagories_buttons');
    for (let i = 0; i < data.length; i++) {
        const categoryButton = document.createElement('button');
        categoryButton.href = '#';
        categoryButton.setAttribute('onclick', `get_catagories(${data[i].category_id})`)
        categoryButton.id = data[i].category_id;
        categoryButton.className = 'btn catagory_button my-2 mx-2';
        categoryButton.textContent = data[i].category;

        catagoriesButtonsContainer.appendChild(categoryButton);
    }

}



// call catagories with id
function parseViews(views) {
    const multiplier = views.endsWith('K') ? 1000 : 1;
    return parseFloat(views) * multiplier;
  }
async function get_catagories(id) {
    let data_array = await fetch_functor(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    data = data_array.data;
    rendar_catagories(data)
    all_product = data;
    all_product.sort((a, b) => parseViews(b.others.views) - parseViews(a.others.views));
}

function rendar_sort(){
    rendar_catagories(all_product);
    console.log(all_product);
}
function rendar_catagories(data){
    const catagoriesButtonsContainer = document.getElementById('card_container');
    if (data.length <= 0) {
        catagoriesButtonsContainer.innerText = ' ';
        catagoriesButtonsContainer.innerHTML= `
        <div class="d-flex justify-content-center align-items-center flex-column m-auto">
        <img width=150 src="./Icon.png" />
        <h2>Oops!! Sorry, There is no content here</h2>
        </div>
        ` ;
    }
    else {
        catagoriesButtonsContainer.innerText = ' ';
        for (let i = 0; i < data.length; i++) {
            const categoryButton = document.createElement('div');
            categoryButton.id = data[i].category_id;
            categoryButton.className = 'col border-0 rounded-0';
            categoryButton.innerHTML = `
                            <div class="">
                                <div class="card  border-0 rounded-0">
                                ${!data[i].thumbnail ?
                                    `<svg 
                                    xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                                    preserveAspectRatio="xMidYMid slice" focusable="false">

                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef"
                                        dy=".3em">Thumbnail</text>
                                    </svg>`
                                :
                                    `<img class="rounded-2 bd-placeholder-img card-img-top" width="100%" height="200" src="${data[i].thumbnail}" />`
                                }
                                                


                                <div class="card-body">
                                    <div class="d-flex align-items-start">
                                        <img class="border-0 rounded-circle" src="${data[i].authors[0].profile_picture}" width="50px" height="50px" alt="">
                                        <div class="mx-3">
                                            <p class="card-text m-0">${data[i].title}</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div><p class="m-0">${data[i].authors[0].profile_name}</p></div>
                                                <p class="m-0">${!data[i].authors[0].verified ?
                                                ''
                                                : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="blue">
                                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.41 7.41l-7.41 7.41-3.41-3.41 1.41-1.41 2 2 6-6 1.41 1.41z"/>
                                                            </svg>
                                                            `
                                                                }</p>
                                            </div>
                                            <small class="text-body-secondary m-0">${data[i].others.views} views</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `

            catagoriesButtonsContainer.appendChild(categoryButton);

        }
    }
}

set_catagories_button();
