import '@/App.css';
import lessStyles from './app.less';
import scssStyles from './app.scss';
import stylStyles from './app.styl';
import smallImg from '@/assets/images/5kb_img.png';
import bigImg from '@/assets/images/10kb_img.png';

function App() {
  return (
    <div>
      <h2>webpack5-react-ts</h2>
      <div className={lessStyles.lessBox}>
        <div className={lessStyles.box}>
          lessBox
          <img src={smallImg} width={69} alt='小于10kb的图片' />
          <img src={bigImg} width={232} alt='大于于10kb的图片' />
          <div className={lessStyles.smallImg}>小图片背景</div>
          <div className={lessStyles.bigImg}>大图片背景</div>
        </div>
      </div>
      <div className={scssStyles.scssBox}>
        <div className={scssStyles.box}>scssBox</div>
      </div>
      <div className={stylStyles.stylBox}>
        <div className={stylStyles.box}>stylBox</div>
      </div>
      <input type='text' />
    </div>
  );
}

export default App;
