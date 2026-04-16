fetch('https://console.hgbrasil.com/')
  .then(response => response.json())
  .then(data => {
    console.log('Here is your data:', data);
  })
  .catch(error => {
    console.error('Oops, something went wrong:', error);
  });
