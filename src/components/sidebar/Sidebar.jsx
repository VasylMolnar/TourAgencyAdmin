import './sidebar.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const exit = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">TourAgency</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">СПИСКИ</p>
          <Link to="/users" style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Користувачі</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: 'none' }}>
            <li>
              <StoreIcon className="icon" />
              <span>Готелі</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: 'none' }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Кімнати</span>
            </li>
          </Link>
          <p className="title">КОРИСНО</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Cтатистика</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Сповіщення</span>
          </li>
          <p className="title">КОРИСТУВАЧ</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Профіль</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={exit}>Вийти</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: 'LIGHT' })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: 'DARK' })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
