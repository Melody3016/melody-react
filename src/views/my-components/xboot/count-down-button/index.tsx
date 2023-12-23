import { Button, ButtonProps } from 'antd';
import { useEffect, useState } from 'react';

// 定义 MyButtonProps，继承 ButtonProps 并添加自定义属性
interface MyButtonProps extends ButtonProps {
  // 显示文本
  text: string;
  // 计时时间
  countTime?: number | string;
  // 是否自动计时
  autoCountDown?: boolean;
  // 计时后缀
  suffixText?: string;
  // 是否禁用
  disabled?: boolean;
  // 单击回调
  onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
const countDownButton: React.FC<MyButtonProps> = ({
  countTime = 60,
  autoCountDown = false,
  suffixText = 's',
  disabled = false,
  text,
  onClick,
  ...props
}) => {
  // state
  const [isCountDown, setIsCountDown] = useState(false);
  const [buttonText, setButtonText] = useState(text);
  const [isDisabled, setIsDisabled] = useState(disabled);
  // let isDisabled = disabled;
  let count = Number(countTime);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const countDown = () => {
      if (count === 0) {
        count = Number(countTime);
        setButtonText(text);
        // isDisabled = false;
        setIsDisabled(false);
        setIsCountDown(false);
        return;
      }
      setButtonText(`${count} ${suffixText}`);
      count--;
      timerId = setTimeout(countDown, 1000);
    };

    if (isCountDown) {
      // isDisabled = true;
      setIsDisabled(true);
      countDown();
    }

    return () => {
      // 清理计时器
      clearTimeout(timerId);
    };
  }, [isCountDown]);

  const handleClick = () => {
    if (autoCountDown) {
      setIsCountDown(true);
    }
    // 执行props传递的单击方法
    onClick && onClick();
  };

  return (
    <Button disabled={isDisabled} onClick={handleClick} {...props}>
      {buttonText}
    </Button>
  );
};
export default countDownButton;
