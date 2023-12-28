import { Outlet } from 'react-router-dom';

const Main: React.FC = () => {
  const func = () => {};

  func();

  return (
    <div className='main'>
      <h1>This is Main</h1>
      <br />
      <Outlet />
    </div>
  );
};
export default Main;
