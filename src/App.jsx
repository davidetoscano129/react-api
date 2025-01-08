import { useState, useEffect } from 'react';
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

  // Gestore per i campi del form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Gestione per checkbox e altri tipi di input
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Gestione dei tag (checkbox multipli)
  const handleTagChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      const updatedTags = checked
        ? [...prev.tags, value] // Aggiungi il tag
        : prev.tags.filter((tag) => tag !== value); // Rimuovi il tag

      return {
        ...prev,
        tags: updatedTags,
      };
    });
  };

  // Gestione invio del form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aggiungi l'articolo solo se il titolo è presente
    if (formData.title.trim() !== '') {
      setArticles([...articles, formData]);
      setFormData({
        title: '',
        image: '',
        content: '',
        category: 'Tech',
        isPublished: false,
        tags: [],
      });
    }
  };

  // useEffect per mostrare un alert quando viene selezionato "Pubblica"
  useEffect(() => {
    if (formData.isPublished) {
      alert('Hai selezionato Pubblica l’articolo!');
    }
  }, [formData.isPublished]);

  return (
    <div className="App">
      <h1>React Blog Form Multifield</h1>
      <form onSubmit={handleSubmit}>
        {/* Titolo */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Inserisci il titolo dell'articolo"
        />
        <br />

        {/* Immagine */}
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="URL dell'immagine"
        />
        <br />

        {/* Contenuto */}
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Inserisci il contenuto dell'articolo"
        />
        <br />

        {/* Categoria */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
        </select>
        <br />

        {/* Pubblica */}
        <label>
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          Pubblica l'articolo
        </label>
        <br />

        {/* Tags */}
        <fieldset>
          <legend>Tags:</legend>
          <label>
            <input
              type="checkbox"
              value="React"
              checked={formData.tags.includes('React')}
              onChange={handleTagChange}
            />
            React
          </label>
          <label>
            <input
              type="checkbox"
              value="JavaScript"
              checked={formData.tags.includes('JavaScript')}
              onChange={handleTagChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              value="CSS"
              checked={formData.tags.includes('CSS')}
              onChange={handleTagChange}
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;