import style from './header.scss';
import imgSrc from '@/assets/images/logo.png';

const Header: React.FC = () => (
  <div className={style.header}>
    <img src={imgSrc} width='300' />
    <div className={style.description}>前后端分离快速开发平台</div>
  </div>
);
export default Header;
