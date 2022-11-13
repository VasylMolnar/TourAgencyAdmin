import './newHotel.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { hotelInputs } from '../../formSource';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const NewHotel = () => {
  const [files, setFiles] = useState('');
  const [info, setInfo] = useState({});

  const handleChange = e => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value.toLowerCase() }));
  };

  //console.log(files)
  const handleClick = async e => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async file => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'upload');
          const uploadRes = await axios.post(
            'https://api.cloudinary.com/v1_1/dw5lear93/image/upload',
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms: [],
        photos: list,
      };

      await axios.post('/hotels', newhotel);
      Notify.success('Готель було додано');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Додати новий готель</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Зображення: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={e => setFiles(e.target.files)}
                  style={{ display: 'none' }}
                />
              </div>

              {hotelInputs.map(input => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Рекомендовані</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>Ні</option>
                  <option value={true}>Так</option>
                </select>
              </div>

              <button onClick={handleClick}>Надіслати</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
