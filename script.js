function toggleLoading(disable=true){
    loader = document.getElementById("loader")
    if (disable){
        loader.classList.add('d-none')
    }else{
        loader.classList.remove('d-none')
    }
}
function addMessage(messages){
    messageElm  = document.getElementById('message')
    if (messageElm.classList.contains('d-none'))
        messageElm.classList.remove('d-none')
    for (var message of messages){
        h1 = document.createElement('h1')
        h1.innerText = message.From
        messageElm.appendChild(h1)
        // document.getElementById('message')
        // doc
    }
}
function getDataSuccess(data, account){
    console.log(data)
    hotmailUseElm = document.querySelector('#hotmail-use')
    hotmailUseElm.innerText = account
    if (data.status === 200){
        hotmailUseElm.classList.add('alert-success')
        addMessage(data.message)
    }else{
        hotmailUseElm.classList.add('alert-primary')
    }
}
function getAllMail(account){
    console.log('run check account:', account)
    toggleLoading(false)
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("https://utopian-delightful-pruner.glitch.me/get-message/" + account, requestOptions)
    .then(response => response.json())
    .then(result => getDataSuccess(result,account))
    .catch(error => console.log('error', error))
    .finally(()=>toggleLoading(toggleLoading(true)))
}
async function test(){
    // let url = 'http://139.180.152.4/get-acc';
//     fetch('https://catfact.ninja/fact')
//   .then((response) => response.json())
//   .then((data) => console.log(data));

    // let url = 'https://catfact.ninja/fact';
    // let url = 'https://65.20.71.249:5002/';
    let url = 'https://ninth-abyssinian-sunstone.glitch.me/';
    let res = await fetch(url);
    let data = await res.json()
    console.log(data)
    
}

document.addEventListener("DOMContentLoaded", () => {
  hotmailListDiv = document.getElementById("hotmail-list");
    functionDiv = document.getElementById("function-div");
  // click hotmail list
    hotmailListDiv.addEventListener('click', (event)=>{
        if (event.target.tagName === 'LI'){
            hotmailListDiv.querySelector('.active').classList.remove('active')
            event.target.classList.add('active')
            account = event.target.innerText
            // disable content element

            getAllMail(account)
        }
    })
    // click functions
    functionDiv.addEventListener('click', (event)=>{
        if (event.target.tagName === 'LABEL'){
            console.log(event.target.innerText)
        }
        // console.log(event.target.querySelector('label').innerText)
    })
});

test()