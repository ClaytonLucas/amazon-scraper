async function scrape() {
  const keyword = document.getElementById('keyword').value.trim();
  const message = document.getElementById('message');
  const results = document.getElementById('results');
  const loader = document.getElementById('loader');

  message.textContent = '';
  results.innerHTML = '';
  loader.style.display = 'block'; // mostra o loader

  if (!keyword) {
    message.textContent = 'Por favor, insira uma palavra-chave.';
    loader.style.display = 'none';
    return;
  }

  try {
    // requisição para busca de produto no backend
    const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    loader.style.display = 'none'; // esconde o loader

    if (!Array.isArray(data) || data.length === 0) {
      message.textContent = 'Nenhum produto encontrado.';
      return;
    }
    // cards dos produtos
    data.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>⭐ ${product.rating || 'Sem avaliação'}</p>
        <p>${product.reviews || '0 avaliações'}</p>
      `;
      results.appendChild(card);
    });
  } catch (err) {
    loader.style.display = 'none'; // esconde o loader em caso de erro
    console.error(err);
    message.textContent = 'Erro ao buscar os dados. Tente novamente.';
  }
}
