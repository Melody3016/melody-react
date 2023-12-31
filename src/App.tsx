import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { useRoutes } from 'react-router-dom';
import BeforeEach from './router/beforeEach';
import { routers as initialRouters } from './router/router';
// import { routers } from './router/router';
// import routersReducer from './router/routersReducer';
import { RoutersContext, SetRoutersContext } from './router/RoutersContext';
import './app.scss';

function App() {
  // const [routers, dispatch] = useReducer(routersReducer, initialRouters);
  const [routers, setRouters] = useState(initialRouters);
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
      {/* <BeforeEach>{element}</BeforeEach> */}

      <RoutersContext.Provider value={routers}>
        <SetRoutersContext.Provider value={setRouters}>
          <BeforeEach>{element}</BeforeEach>
        </SetRoutersContext.Provider>
      </RoutersContext.Provider>
    </ConfigProvider>
  );
}

export default App;
