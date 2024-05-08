const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', (e) => {
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;
  const address = document.getElementById('address');
  const tempField = document.getElementById('temp');
  const forecastField = document.getElementById('forecast');

  e.preventDefault();

  fetch(
    `http://localhost:3000/weather?address=${city}&country=${country}`,
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        tempField.textContent = data.error;
      } else {
        const { location, forecast, temp } = data;
        address.textContent = location;
        tempField.textContent = temp;
        forecastField.textContent = forecast;
      }
    });
  });
});
