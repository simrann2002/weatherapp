console.log('client side javascript loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=pune').then((response) => {
//     response.json().then((jsobj) => {         //response converted into js object by json()
//         if (jsobj.error) {
//             console.log({
//                 error: jsobj.error
//             })
//         }
//         else {
//             console.log({
//                 temperature: jsobj.temperature,
//                 humidity: jsobj.humidity,
//                 description: jsobj.forecast
//             })
//         }
//     })
// })

const weatherform = document.querySelector('form')
const searchelement = document.querySelector('input')

const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')
const messagefour = document.querySelector('#message-4')


// messageone.textContent = 'From javascript...'


weatherform.addEventListener('submit', (e) => {  //e is event object
    e.preventDefault()    //preserve the data,otherwise javascipt which is written on submit flashes for milisecond and not remains displayed

    const location = searchelement.value

    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''
    messagethree.textContent = ''
    messagefour.textContent = ' '

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((jsobj) => {         //response converted into js object by json()
            if (jsobj.error) {
                // console.log({
                //     error: jsobj.error
                // })
                messageone.textContent = jsobj.error
                // messagetwo.textContent = jsobj.error
            }
            else {
                // console.log({
                //     temperature: jsobj.temperature,
                //     humidity: jsobj.humidity,
                //     description: jsobj.forecast
                // })
                messageone.textContent = jsobj.location
                messagetwo.textContent = 'Temperature: ' + jsobj.temperature + ' degree celcius'
                messagethree.textContent = 'Humidity: ' + jsobj.humidity + ' percent' 
                messagefour.textContent = 'Summary: '+jsobj.forecast

            }
        })
    })
})


