import { Row } from 'antd';
import style from './footer.scss';

const Footer: React.FC = () => (
  <div className={style.foot}>
    <Row justify='center'> react + antd + webpack </Row>
    <Row justify='center'> Copyright © 2022 - Present </Row>
  </div>
);
export default Footer;
