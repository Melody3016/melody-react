import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './reducers/appSlice';
// import { composeWithDevTools } from '@redux-devtools/extension';

export const store = configureStore({
  reducer: {
    app: appReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // 关闭redux序列化检测
      serializableCheck: false
    })

  // composeWithDevTools(
  //   applyMiddleware(...middleware),
  //   // other store enhancers if any
  // )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
