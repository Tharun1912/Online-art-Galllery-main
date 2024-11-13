import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadArtwork.css';

const UploadArtwork = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Paintings'); // Default category
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert('Please upload at least one image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8081/api/artworks/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Artwork uploaded:', response.data);
      alert('Artwork uploaded successfully!');
    } catch (error) {
      console.error('Error uploading artwork:', error);
      alert('Error uploading artwork');
    }
  };

  return (
    <div className="upload-artwork-container">
      <h2 className="upload-artwork-title">Upload Artwork</h2>
      
      <form className="upload-artwork-form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          className="form-input"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="artist" className="form-label">Artist</label>
        <input
          type="text"
          id="artist"
          className="form-input"
          placeholder="Enter artist name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />

        <label htmlFor="price" className="form-label">Price</label>
        <input
          type="number"
          id="price"
          className="form-input"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          className="form-textarea"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Paintings">Paintings</option>
          <option value="Sculptures">Sculptures</option>
          <option value="Digital Arts">Digital Arts</option>
        </select>

        <label htmlFor="image" className="form-label">Upload Image</label>
        <input
          type="file"
          id="image"
          className="form-file-input"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="form-submit-button">Upload Artwork</button>
      </form>
    </div>
  );
};

export default UploadArtwork;
