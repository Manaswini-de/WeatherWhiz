const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city-name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const checkbox = document.querySelector('input[type="checkbox"]');
const data_hide = document.querySelector('.middle-layer');

let getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerHTML = `<i>Please enter something before you search</i>`
        data_hide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=24b825c673d3fbc9cc20fe3ff1b35a80`

            const response = await fetch(url);
            const data = await response.json()
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            if (checkbox.checked) {
                let tempInCel = arrData[0].main.temp;
                let tempInf = tempInCel * 9 / 5 + 32;
                temp.innerHTML = `${tempInf}<sup>o</sup>F`;
            }
            else {
                temp.innerHTML = `${arrData[0].main.temp} <sup>o</sup>C`;
            }
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood)

            if (tempMood == "Clear") {
                temp_status.innerHTML = `<i class="fa-solid fa-sun fa-beat" style="color: #eccc68;"></i>`
            }
            else if (tempMood == "Sunny") {
                temp_status.innerHTML = `<i class="fa-solid fa-sun fa-beat" style="color: #eccc68;"></i>`
            }
            else if (tempMood == "Clouds") {
                temp_status.innerHTML = `<i class="fa-solid fa-cloud fa-beat" style="color: #f1f2f6";></i>`
            }
            else if (tempMood == "Rain") {
                temp_status.innerHTML = `<i class="fa-solid fa-cloud-rain fa-beat" style="color: #fff";></i>`
            }
            else if (tempMood == "Haze" || tempMood == 'Mist') {
                temp_status.innerHTML = `<i class="fa-solid fa-smog fa-beat" style="color: #fff";></i>`
            }
            else if (tempMood == "Snow") {
                temp_status.innerHTML = `<i class="fa-solid fa-snowflakes fa-beat" style="color: #fff";></i>`
            }
            else {
                temp_status.innerHTML = `<i class="fa-solid fa-sun fa-beat" style="color: #eccc68;"></i>`
            }

            data_hide.classList.remove('data_hide');

            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    let tempInCel = arrData[0].main.temp;
                    let tempInf = tempInCel * 9 / 5 + 32;
                    temp.innerHTML = `${tempInf}<sup>o</sup>F`;
                } else {
                    temp.innerHTML = `${arrData[0].main.temp} <sup>o</sup>C`;
                }
            });
        }
        catch {
            city_name.innerHTML = `<i style="color: red">Please enter the correct city name</i>`
            data_hide.classList.add('data_hide');
        }


    }
}

submitBtn.addEventListener('click', getInfo);

let currDate = document.querySelector("#date");

let getCurrDay = () => {
    let weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

    let now = new Date();
    let day = weekday[now.getDay()];
    return day;
}

let getCurrTime = () => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currTime = new Date();
    let month = months[currTime.getMonth()];
    let date = currTime.getDate();

    let hours = currTime.getHours();
    let mins = currTime.getMinutes();

    let period = "AM";

    if (hours == 0) {
        hours = 12;
    }
    else if (hours > 11) {
        period = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return `${month} ${date}  |  ${hours} : ${mins} ${period}`
}

currDate.innerHTML = getCurrDay() + "  |  " + getCurrTime();

