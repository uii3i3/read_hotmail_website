// headers = {
//     'Access-Control-Allow-Origin': 'https://139.180.211.142:5001',
//     'Access-Control-Request-Method': 'GET',
//     'Access-Control-Request-Headers': 'Content-Type, Authorization'
// }
fetch('https://139.180.211.142:5001/',{mode: 'no-cors',headers:headers}).then(res=>res.text).then(data=>console.log(data))
fetch('https://139.180.211.142:5001/').then(res=>res.json()).then(data=>console.log(data))
fetch('https://catfact.ninja/fact').then(res=>res.json()).then(data=>console.log(data))
fetch('https://huynguyen1201-ubiquitous-spoon-xpvgp77j4gr3v6xv-5001.preview.app.github.dev/').then(res=>res.json()).then(data=>console.log(data))