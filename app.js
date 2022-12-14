window.addEventListener('load', ()=> {
    let long;
    let lat;
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureSection = document.querySelector(".degree-section");
    const temperatureSpan = document.querySelector(".degree-section span");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
        
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`;
            
            fetch(api)
                .then(response => { return response.json(); })
                .then(data => {
                    // console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;

                    //Forumula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change temperature sign text to Celsius/Farenheit 
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C"
                            temperatureDegree.textContent = Math.floor(celsius);    
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;   //API default degree is F 

                        }
                    });

                });
         });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    } 
});