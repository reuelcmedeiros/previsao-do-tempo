// Proxy CORS gratuito que funciona
const input = document.getElementById('campo-pesquisa');

input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const city = input.value.trim();
    if (city) {
      const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://api.hgbrasil.com/weather?format=json&key=0127cdc3&city_name=${encodeURIComponent(city)}`);
      fetch(proxyUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then(data => {
          console.log('Dados API:', data); // Debug
          if (data.results) {
            document.getElementById('cidade').textContent = data.results.city;
            document.getElementById('temperatura').textContent = data.results.temp + '°C';
            document.getElementById('descricao').textContent = data.results.description;
            document.getElementById('icone-clima').src = data.results.img_id ? `https://assets.hgbrasil.com/weather/icons/${data.results.img_id}.png` : '';
            
            const previsao = document.getElementById('previsao');
            previsao.innerHTML = '<h3>Previsão para os próximos dias</h3>';
            (data.results.forecast || []).slice(0, 5).forEach(day => {
              const diaDiv = document.createElement('div');
              diaDiv.className = 'dia';
              diaDiv.innerHTML = `
                <span class="data">${day.date}</span>
                <span class="temp">${day.min || ''}° / ${day.max || ''}°</span>
                <span class="desc">${day.description}</span>
              `;
              previsao.appendChild(diaDiv);
            });
          } else {
            alert('Cidade não encontrada: ' + JSON.stringify(data));
          }
        })
        .catch(error => {
          console.error('Erro completo:', error);
          alert('Erro na API. Console tem detalhes.');
        });
    }
  }
});

console.log('JS carregado OK!');
