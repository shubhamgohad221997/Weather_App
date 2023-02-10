//src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
function getData() {
    let city = document.getElementById("city").value;
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a73a718241e013d65ebf19421e4f9ef2`;
  
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        append(res);
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  
  function getDataLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a73a718241e013d65ebf19421e4f9ef2`;
  
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        append(res);
        console.log("res",res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  
  function append(data) {
    let container = document.getElementById("container");
    let map = document.getElementById("gmap_canvas");
    container.innerHTML = null;
  
    let p1=document.createElement("span");
    p1.innerHTML='<i class="fa-solid fa-city"></i>';
    let city = document.createElement("p");
    city.innerText = `City: ${data.name}`;
    let box1=document.createElement("div");
    box1.append(p1,city);
    box1.setAttribute("id","box1")
 
    let p2=document.createElement("span");
    p2.innerHTML='<i class="fa-solid fa-temperature-arrow-down"></i>';
    let min = document.createElement("p");
    min.innerText = `Min temp: ${(data.main.temp_min-273).toFixed(2)} \u00B0C`;
    let box2=document.createElement("div");
    box2.append(p2,min);
    box2.setAttribute("id","box2")
  
    let p3=document.createElement("span");
    p3.innerHTML='  <i class="fa-solid fa-temperature-arrow-up"></i>';
    let max = document.createElement("p");
    max.innerText = `Max temp: ${(data.main.temp_max-273).toFixed(2)} \u00B0C`;
    let box3=document.createElement("div");
    box3.append(p3,max);
    box3.setAttribute("id","box3")
  
    let p4=document.createElement("span");
    p4.innerHTML='<i class="fa-solid fa-temperature-high"></i>';
    let current = document.createElement("p");
    current.innerText = `Current Temp: ${(data.main.temp-273).toFixed(2)} \u00B0C`;
    let box4=document.createElement("div");
    box4.append(p4,current);
    box4.setAttribute("id","box4")
  
    let p5=document.createElement("span");
    p5.innerHTML='<i class="fa-solid fa-wind"></i>';
    let wind = document.createElement("p");
    wind.innerText = `Wind: ${data.wind.speed}`;
    let box5=document.createElement("div");
    box5.append(p5,wind);
    box5.setAttribute("id","box5")

    let p6=document.createElement("span");
    p6.innerHTML='<i class="fa-solid fa-sun"></i>';
    let second=data.sys.sunrise;
    let date= new Date(second*1000)
    let sunrise = document.createElement("p");
    sunrise.innerText = `Sunrise: ${date.toLocaleTimeString()}`;
    let box6=document.createElement("div");
    box6.append(p6,sunrise);
    box6.setAttribute("id","box6")

    let p7=document.createElement("span");
    p7.innerHTML='<i class="fa-solid fa-sun"></i>';
    let second1=data.sys.sunset;
    let date1= new Date(second1*1000)
    let sunset = document.createElement("p");
    sunset.innerText = `Sunset: ${date1.toLocaleTimeString()}`;
    let box7=document.createElement("div");
    box7.append(p7,sunset);
    box7.setAttribute("id","box7")
  
    container.append(box1, box2, box3, box4, box5,box6,box7);
    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  }
  





  function getwhether(){
    navigator.geolocation.getCurrentPosition(success);
  
    function success(position) {
      let crd = position.coords;
  
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
  
      getDataLocation(crd.latitude, crd.longitude);

      forcast(crd.latitude, crd.longitude);
    }
  }


  function forcast(lat, lon) {
    const url7day = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=a73a718241e013d65ebf19421e4f9ef2`;

    fetch(url7day).then(function (result) {
        return result.json();
    }).then(function (result) {
        console.log(result);
        let arr = result.daily;
        console.log("here", arr);
        append7Day(arr);
    })
        .catch(function (error) {
            console.log(error);
        })
}

function append7Day(data) {
    let main = document.querySelector("#details7Days");
    document.getElementById("details7Days").innerHTML=null;
    let i=0;
    data.map(function (elem) {
        if(i==0) {
        } else {

            let box = document.createElement("div");



            

            let temp = document.createElement("h3");
            temp.innerText = `Temperature : ${Math.round(elem.temp.day -273)}°C`;


                      
              let p3=document.createElement("span");
              p3.innerHTML='  <i class="fa-solid fa-temperature-arrow-up"></i>';

            let maxTemp = document.createElement("h3");
            maxTemp.innerText = `Max Temp:${Math.round(elem.temp.max -273)}°C`;
            let box3=document.createElement("div");
            box3.append(p3,maxTemp);
            box3.setAttribute("id","box3")


            let p2=document.createElement("span");
             p2.innerHTML='<i class="fa-solid fa-temperature-arrow-down"></i>';
 
            let minTemp = document.createElement("h3");
            minTemp.innerText = `Min Temp:${Math.round(elem.temp.min -273)}°C`;

            let box2=document.createElement("div");
            box2.setAttribute("id","box2")
            box2.append(p2,minTemp);
        

            let humidity = document.createElement("h3");
            humidity.innerText = `Humidity : ${elem.humidity}`;

            box.append(temp, box3, box2);

            main.append(box);
        }
        i++;
    })
}