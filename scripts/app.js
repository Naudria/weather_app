// DOM manipulation
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

	// const cityDets = data.cityDets;
	// const weather = data.weather;
	console.log(data);

	// destructure properties
	const { cityDets, weather } = data;

	
	


	// update details template
	details.innerHTML = `
		<h4 class="my-3">${cityDets.EnglishName}</h5>
		<h6 class="my-3"></h6>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-3 my-3">
      <span>${weather.Temperature.Imperial.Value}</span>
      <span>&deg;F</span>
    </div>
    <h4 class="my-3">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </h4>
	`;

const state = document.querySelector('h6.my-3')
if(cityDets.Country.ID === "US"){
		state.innerText = `${cityDets.AdministrativeArea.EnglishName}`
	} else {
		state.innerText = `${cityDets.Country.EnglishName}`
	};



	// update the night/day & icon images
	
	const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	// ternary operator
	let timeSrc = weather.IsDayTime ? 'img/day.jpg' : 'img/night.jpg';
	// above does the same thing as:
	// let timeSrc = null;
	// if(weather.IsDayTime){
	// 	timeSrc = 'img/day.svg';
	// } else {
	// 	timeSrc = 'img/night.svg'
	// }
	time.setAttribute('src', timeSrc);

	// remove the d-none class if present
	if(card.classList.contains('d-none')){
		card.classList.remove('d-none');
	};

};

const updateCity = async (city) => {

	const cityDets = await getCity(city);
	const weather = await getWeather(cityDets.Key);

	return {
		cityDets,
		weather
		// cityDets: cityDets,
		// weather: weather

	}; 

};

cityForm.addEventListener('submit', e => {
	e.preventDefault();

	const city = cityForm.city.value.trim();
	cityForm.reset();

	//update the UI with the new city
	updateCity(city)
		.then(data => updateUI(data))
		.catch(err => console.log(err));	

});