import { ConfigProvider } from 'antd';
import { useRoutes } from 'react-router-dom';
import BeforeEach from './router/beforeEach';
import { routers } from './router/router';
import './app.scss';

function App() {
  console.log('app.tsx ==> routers', routers);

  const element = useRoutes(routers);
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#0074a6'
        }
      }}
    >
      <BeforeEach>{element}</BeforeEach>
    </ConfigProvider>
  );
}

export default App;
