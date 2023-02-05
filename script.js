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
    if (window.taskName == 'btnradio1'){
        index = 0
        for (var message of messages){
            mes = document.createElement('div')
            mes.innerHTML = `<li id="${index}" class="list-group-item list-group-item-action">
                  <div class="row align-items-center">
                    <div class="col-6">${index + 1}. ${message.Subject.slice(0,40)}${(message.Subject.length > 40) ? '...': ''}</div>
                    <div class="col-3">From: ${message.From}</div>
                    <div class="col-3">${message.Date.split(' ').slice(0,5).join(' ')}</div>
            </li>`
            messageElm.appendChild(mes.firstChild)
            index ++
        }
    }
    else if(window.taskName == 'btnradio2'){
        if (messages === 'can not find veri link.'){
            document.getElementById('message').innerHTML = `<p>Can not find veri link. Try again</p>`
        }else{
            document.getElementById('message').innerHTML = `<p>Found:</p><a href="${messages}">${messages}</a>`
        }

    }
}
function getDataSuccess(data, account){
    console.log(data)
    hotmailUseElm = document.querySelector('#hotmail-use')
    hotmailUseElm.innerText = account
    if (data.status === 200){
        window.messages = data.message
        hotmailUseElm.classList.add('alert-success')
        addMessage(data.message)
    }else{
        hotmailUseElm.classList.add('alert-danger')
    }
}
function getAllMail(account){
    console.log('run check account:', account)
    // get task of action
    task = 'all-mail'
    if (window.taskName === 'btnradio2')
        task = 'get-stripe-veri-link'
    toggleLoading(false)
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch(`https://utopian-delightful-pruner.glitch.me/get-message/${account}/${task}`, requestOptions)
    // fetch(`http://192.168.2.10:5003/get-message/${account}/${task}`, requestOptions)
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
    messageDiv = document.getElementById('message')
    importBtn = document.getElementById('importHotmailBtn')
    // init some value
    window.taskName = 'btnradio1'
  // click hotmail list
    hotmailListDiv.addEventListener('click', (event)=>{
        if (event.target.tagName === 'LI'){
            try{
                hotmailListDiv.querySelector('.active').classList.remove('active')
            }
            catch(err){}
            event.target.classList.add('active')
            account = event.target.innerText
            // disable content element
            if (document.querySelector('#hotmail-use').classList.contains('alert-success'))
            document.querySelector('#hotmail-use').classList.remove('alert-success')
            if (document.querySelector('#hotmail-use').classList.contains('alert-danger'))
            document.querySelector('#hotmail-use').classList.remove('alert-danger')
            document.querySelector('#hotmail-use').innerText = 'Checking: ' + account
            document.querySelector('#message').innerHTML = ''

            getAllMail(account)
        }
    })
    // click functions
    functionDiv.addEventListener('click', (event)=>{
        if (event.target.tagName === 'LABEL'){
            window.taskName = event.target.getAttribute('for')
            console.log(event.target.innerText)
        }
        // console.log(event.target.querySelector('label').innerText)
    })
    // mess li click
    messageDiv.addEventListener('click', (event)=>{
        if (event.target.closest('li')){
            // edit modal
            index = parseInt(event.target.closest('li').id)
            mess = window.messages[index]
            document.getElementById('messageContentSubject').innerText = mess.Subject

            iframeElm = document.createElement('iframe')
            iframeElm.srcdoc = mess.Content
            // iframeElm.setAttribute("style","width:800px");
            document.getElementById('messageContentBody').innerHTML = ''
            document.getElementById('messageContentBody').appendChild(iframeElm)


            // iframeElm = document.createElement('iframe')
            // iframeElm.body.innerHTML = mess.Content
            // document.getElementById('messageContentBody').appendChild(iframeElm)
            // document.getElementById('messageContentBody').innerHTML = mess.Content

            // show modal
            document.getElementById('messageContentButton').click()

        }
    })
    // import hotmail
    importBtn.addEventListener('click',(event)=>{
        // document.getElementById('inputHotmailText').textContent
        inputHotMailText = document.getElementById('inputHotmailText').value.trim()
        if (!inputHotMailText)
            return
        accounts = document.getElementById('inputHotmailText').value.split('\n')
        // show list
        hotmailListDiv = document.getElementById('hotmail-list')
        if (hotmailListDiv.classList.contains('d-none'))
            hotmailListDiv.classList.remove('d-none')
        // delete old
        document.getElementById('hotmailOl').innerHTML = ''
        // add hotmails

        for (var account of accounts){
            acc = document.createElement('div')
            acc.innerHTML = `<li class="list-group-item list-group-item-action">${account}</li>`
            document.getElementById('hotmailOl').appendChild(acc.firstChild)
        }
    })
});

// test()