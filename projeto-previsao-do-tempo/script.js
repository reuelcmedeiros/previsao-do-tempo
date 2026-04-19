const input = document.getElementById('campo-pesquisa');

input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const city = input.value.trim();
    if (city) {
      fetch(`https://api.hgbrasil.com/weather?format=json&key=57fe3e2c&city_name=${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
          if (data.results) {
            document.getElementById('cidade').textContent = data.results.city;
            document.getElementById('temperatura').textContent = data.results.temp + '°C';
            document.getElementById('descricao').textContent = data.results.description;
            document.getElementById('icone-clima').src = data.results.img_id ? `https://assets.api.hgbrasil.com/weather/icons/${data.results.img_id}.png` : '';
            
            const previsao = document.getElementById('previsao');
            previsao.innerHTML = '<h3>Previsão para os próximos dias</h3>';
            data.results.forecast.slice(0, 5).forEach(day => {
              const diaDiv = document.createElement('div');
              diaDiv.className = 'dia';
              diaDiv.innerHTML = `
                <span class="data">${day.date}</span>
                <span class="temp">${day.min}° / ${day.max}°</span>
                <span class="desc">${day.description}</span>
              `;
              previsao.appendChild(diaDiv);
            });
          } else {
            alert('Cidade não encontrada.');
          }
        })
        .catch(error => {
          console.error('Erro ao buscar dados:', error);
          alert('Erro ao buscar dados do clima.');
        });
    }
  }
});
