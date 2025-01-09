import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    content: '',
    category: 'Tech',
    isPublished: false,
    tags: [],
  });

  const [articles, setArticles] = useState([]);

  // Fetch iniziale degli articoli al caricamento del componente
  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
      .then((res) => setArticles(res.data))
      .catch((err) => console.error('Errore nel fetch degli articoli:', err));
  }, []);

  // Gestione invio del form (POST)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title.trim() !== '') {
      axios.post('http://localhost:3000/api/posts', formData)
        .then((res) => {
          setArticles((prev) => [...prev, res.data]); // Aggiorna lo stato con il nuovo articolo
          setFormData({
            title: '',
            image: '',
            content: '',
            category: 'Tech',
            isPublished: false,
            tags: [],
          });
        })
        .catch((err) => console.error('Errore nell\'aggiungere un articolo:', err));
    }
  };

  // Gestione eliminazione articoli (DELETE)
  const handleDelete = (index) => {
    axios.delete(`http://localhost:3000/api/posts/${index}`)
      .then(() => {
        setArticles((prev) => prev.filter((_, i) => i !== index)); // Rimuove l'articolo eliminato dallo stato
      })
      .catch((err) => console.error('Errore nell\'eliminare l\'articolo:', err));
  };

  return (
    <div className="App">
      <h1>React Blog Form Multifield</h1>
      <form onSubmit={handleSubmit}>
        {/* Campi del form */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Inserisci il titolo dell'articolo"
        />
        <br />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="URL dell'immagine"
        />
        <br />

        <textarea
          name="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Inserisci il contenuto dell'articolo"
        />
        <br />

        <select
          name="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
        </select>
        <br />

        <label>
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
          />
          Pubblica l'articolo
        </label>
        <br />

        <fieldset>
          <legend>Tags:</legend>
          <label>
            <input
              type="checkbox"
              value="React"
              checked={formData.tags.includes('React')}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.checked
                    ? [...prev.tags, value]
                    : prev.tags.filter((tag) => tag !== value),
                }));
              }}
            />
            React
          </label>
          <label>
            <input
              type="checkbox"
              value="JavaScript"
              checked={formData.tags.includes('JavaScript')}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.checked
                    ? [...prev.tags, value]
                    : prev.tags.filter((tag) => tag !== value),
                }));
              }}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              value="CSS"
              checked={formData.tags.includes('CSS')}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.checked
                    ? [...prev.tags, value]
                    : prev.tags.filter((tag) => tag !== value),
                }));
              }}
            />
            CSS
          </label>
        </fieldset>
        <br />

        <button type="submit">Aggiungi Articolo</button>
      </form>

      {/* Lista articoli */}
      <h2>Articoli</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <img src={article.image} alt={article.title} style={{ width: '200px' }} />
            <p>{article.content}</p>
            <p>Categoria: {article.category}</p>
            <p>Stato: {article.isPublished ? 'Pubblicato' : 'Bozza'}</p>
            <p>Tags: {article.tags.join(', ')}</p>
            <button onClick={() => handleDelete(index)}>Elimina</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;