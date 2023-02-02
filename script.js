function getAllMail(account){
    user = account.split("|")[0]
    pwd = account.split("|")[1]
}
async function test(){
    // let url = 'http://139.180.152.4/get-acc';
//     fetch('https://catfact.ninja/fact')
//   .then((response) => response.json())
//   .then((data) => console.log(data));

    let url = 'https://catfact.ninja/fact';
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
            document.querySelector('#hotmail-use').innerText = event.target.innerText

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