const API_KEY = "13b23b02e71a83201b9036ffb09fe3b8";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("track-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const trackName = document.getElementById("track-name").value.trim();
    const artistName = document.getElementById("artist-name").value.trim();
    const resultsList = document.getElementById("results");

    // Limpa os resultados anteriores
    resultsList.innerHTML = "";

    if (!trackName || !artistName) {
      resultsList.innerHTML = "<li>Por favor, preencha todos os campos.</li>";
      return;
    }

    try {
      const url = `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&track=${encodeURIComponent(
        trackName
      )}&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erro ao acessar a API do Last.fm");
      }

      const data = await response.json();

      if (!data.similartracks || !data.similartracks.track || data.similartracks.track.length === 0) {
        resultsList.innerHTML = `<li>Nenhuma música semelhante encontrada para "${trackName}" de "${artistName}".</li>`;
        return;
      }

      // Exibe os resultados
      data.similartracks.track.slice(0, 10).forEach((track) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${track.name} - ${track.artist.name}`;
        resultsList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Erro ao buscar músicas semelhantes:", error);
      resultsList.innerHTML = "<li>Erro ao buscar músicas semelhantes. Tente novamente mais tarde.</li>";
    }
  });
});
