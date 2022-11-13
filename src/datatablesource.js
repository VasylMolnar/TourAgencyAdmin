export const userColumns = [
  { field: '_id', headerName: 'ID', width: 70 },
  {
    field: 'user',
    headerName: 'Користувач',
    width: 230,
    renderCell: params => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 230,
  },
  {
    field: 'country',
    headerName: 'Країна',
    width: 100,
  },
  {
    field: 'city',
    headerName: 'Місто',
    width: 100,
  },
  {
    field: 'phone',
    headerName: 'Телефон',
    width: 100,
  },
];

export const hotelColumns = [
  { field: '_id', headerName: 'ID', width: 250 },
  {
    field: 'name',
    headerName: 'Імя',
    width: 150,
  },
  {
    field: 'type',
    headerName: 'Тип',
    width: 100,
  },
  {
    field: 'title',
    headerName: 'Назва',
    width: 230,
  },
  {
    field: 'city',
    headerName: 'Місто',
    width: 100,
  },
];

export const roomColumns = [
  { field: '_id', headerName: 'ID', width: 100 },
  {
    field: 'title',
    headerName: 'Назва кімнати',
    width: 130,
  },
  {
    field: 'hotelName',
    headerName: 'Назва готелю',
    width: 200,
  },
  {
    field: 'hotelRoomNumber',
    headerName: 'Номера',
    width: 130,
  },
  {
    field: 'desc',
    headerName: 'Опис',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Ціна',
    width: 50,
  },
  {
    field: 'maxPeople',
    headerName: 'Max людей',
    width: 100,
  },
];
