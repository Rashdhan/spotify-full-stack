import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { url } from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [album, setAlbum] = useState('none');
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);
  const [formError, setFormError] = useState('');

  // Load album data
  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumData(response.data.albums || []);
    } catch (error) {
      toast.error('Failed to load album data.');
      console.error('Error loading album data:', error);
    }
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setFormError('');
    setLoading(true);

    if (!song || !image || !name || !desc) {
      setFormError('Please fill all fields and upload the required files.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('audio', song);
      formData.append('album', album);

      const response = await axios.post(`${url}/api/song/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success('Song added successfully');
        resetForm();
      } else {
        toast.error('Failed to add song');
      }
      setLoading(false);
    } catch (error) {
      toast.error('An error occurred while adding the song');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setName('');
    setDesc('');
    setAlbum('none');
    setImage(null);
    setSong(null);
  };

  // Load albums on component mount
  useEffect(() => {
    loadAlbumData();
  }, []);

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
      {formError && (
        <div className="text-red-600 mb-4">{formError}</div>
      )}

      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              className="w-24 cursor-pointer"
              src={song ? assets.upload_added : assets.upload_song}
              alt="Upload Song"
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              className="w-24 cursor-pointer"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Image"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
        >
          <option value="none">None</option>
          {albumData.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;
