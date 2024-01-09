let input=document.querySelector("#input")
let search=document.querySelector("#search")
let location1=document.querySelector("#location")
let cloud=document.querySelector("#cloud")
let temperature=document.querySelector("#temperature")
let sky=document.querySelector("#sky")
let humidity=document.querySelector("#humidity")
let speed=document.querySelector("#speed")
let city=document.querySelector("#city")
let result=document.querySelector("#result")
let fullSearch=document.querySelector("#fullSearch")
let eror=document.querySelector("#eror")
let apiKey="abad9d5620e87edad5248a68e347a1e7"
let icon={
    "Clear":"https://openweathermap.org/img/w/01d.png",
    "few clouds":" https://openweathermap.org/img/w/02d.png",
    "scattered clouds":"https://openweathermap.org/img/w/03d.png",
    "broken clouds":"https://openweathermap.org/img/w/04d.png",
    "shower rain":"https://openweathermap.org/img/w/09d.png",
    "rain":"https://openweathermap.org/img/w/10d.png",
    "thunderstorm":"https://openweathermap.org/img/w/11d.png",
     "snow":" https://openweathermap.org/img/w/13d.png,",
     "mist":"https://openweathermap.org/img/w/50d.png",
     "fog":"https://openweathermap.org/img/w/50d.png",
     "smoke":"https://openweathermap.org/img/w/50d.png",
     "haze":"https://openweathermap.org/img/w/50d.png",
     "overcast clouds":"https://openweathermap.org/img/w/04d.png",
     "Clouds":"https://openweathermap.org/img/w/02d.png",
     "Rain":"https://openweathermap.org/img/w/10d.png",
     "Thunderstorm":"https://openweathermap.org/img/w/11d.png",
     "Snow":"https://openweathermap.org/img/w/13d.png",
     "Mist":"https://openweathermap.org/img/w/50d.png"

     
}

let arr=[]
async function geolocation(latitud,longitud) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&APPID=${apiKey}&units=metric`);
    let response2 = await response.json();   
    return response2
}

   navigator.geolocation.getCurrentPosition(
        function  (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
      arr.push(latitude)
      arr.push(longitude)  
        }
        
    );

location1.addEventListener("click",async()=>{
    let data=await geolocation(arr[0],arr[1])
    cloud.src=icon[`${data.weather[0].main}`]
    city.innerHTML=data.name
    temperature.innerHTML=Math.ceil(data.main.temp)
    sky.innerHTML=data.weather[0].description
    humidity.innerHTML=`${data.main.humidity}%`
    speed.innerHTML=data.wind.speed
    fullSearch.style.height="700px"
    console.log(data);
    result.classList.remove('d-none')
    eror.classList.add("d-none")
    input.value=""
   
})

async function searcC(cityN){
    let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityN}&APPID=${apiKey}&units=metric`)
    let response2=await response.json()
    return response2
}


search.addEventListener("click",async function(){
  try{
    let data2=await searcC(input.value)
    cloud.src=icon[`${data2.weather[0].main}`]
    city.innerHTML=data2.name
    temperature.innerHTML=Math.ceil(data2.main.temp)
    sky.innerHTML=data2.weather[0].description
    humidity.innerHTML=`${data2.main.humidity}%`
    speed.innerHTML=data2.wind.speed
    fullSearch.style.height="700px"
    result.classList.remove('d-none')
    input.value=
    ''
    eror.classList.add("d-none")

  }
  catch{
    eror.classList.remove("d-none")
    result.classList.add('d-none')
    fullSearch.style.height="400px"
  }
    
})