import './newRoom.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState();
  const [rooms, setRooms] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const { data, loading } = useFetch('/hotels');

  const handleChange = e => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    const roomNumbers = rooms.split(',').map(room => ({ number: room }));
    try {
      await axios.post(`/rooms/${hotelId}`, {
        ...info,
        roomNumbers,
        hotelId,
        hotelName,
        hotelRoomNumber: rooms,
      });
      Notify.success('Кімнату було додано');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectHotel = e => {
    const selectedOptionIndex = e.target.selectedIndex;
    const selectedOptionText = e.target.options[selectedOptionIndex].text;
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setHotelId(value);
    setHotelName(selectedOptionText);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Додати нову кімнату</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map(input => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Кімнати</label>
                <textarea
                  onChange={e => setRooms(e.target.value)}
                  placeholder="поставте кому між номерами кімнат."
                />
              </div>
              <div className="formInput">
                <label>Виберіть готель</label>
                <select id="hotelId" onChange={handleSelectHotel}>
                  {loading
                    ? 'Завантаження'
                    : data &&
                      data.map(hotel => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
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

export default NewRoom;
