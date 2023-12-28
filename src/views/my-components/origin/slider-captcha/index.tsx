import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const SliderCaptcha = ({ onVerify }) => {
  const [isVerified, setVerified] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderSpringProps, setSliderSpringProps] = useSpring(() => ({
    left: '0%',
    config: { tension: 300, friction: 20 }
  }));

  const handleSlide = e => {
    // 获取鼠标或触摸的位置
    const position = e.clientX || e.touches[0].clientX;
    // 更新滑块位置
    setSliderPosition(position);
    // 更新动画效果
    setSliderSpringProps({
      left: `${(position / window.innerWidth) * 100}%`
    });
  };

  const handleRelease = () => {
    // 判断是否达到验证条件，这里可以根据实际需求进行调整
    const verificationThreshold = 90;
    if (sliderPosition > window.innerWidth * (verificationThreshold / 100)) {
      setVerified(true);
      onVerify(); // 验证通过时执行的回调
    } else {
      // 验证未通过时的处理
      setSliderPosition(0);
      setSliderSpringProps({ left: '0%' });
    }
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '80px', overflow: 'hidden' }}
      onMouseMove={handleSlide}
      onTouchMove={handleSlide}
      onMouseUp={handleRelease}
      onTouchEnd={handleRelease}
    >
      <animated.div
        style={{
          position: 'absolute',
          top: '0',
          left: sliderSpringProps.left,
          width: '50px',
          height: '100%',
          background: 'blue'
        }}
      />
      {!isVerified && (
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '20px'
          }}
        >
          Slide to Verify
        </div>
      )}
    </div>
  );
};

export default SliderCaptcha;
