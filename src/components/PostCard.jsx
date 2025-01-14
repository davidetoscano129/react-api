import React from 'react';

const PostCard = ({ article, handleDelete }) => {
    return (
        <div className="post-card">
            <h3>{article.title}</h3>
            <img src={article.image} alt={article.title} style={{ width: '200px' }} />
            <p>{article.content}</p>
            <p>Categoria: {article.category}</p>
            <p>Stato: {article.isPublished ? 'Pubblicato' : 'Bozza'}</p>
            <p>Tags: {article.tags.join(', ')}</p>
            <button onClick={() => handleDelete(article.id)}>Elimina</button>
        </div>
    );
};

export default PostCard;