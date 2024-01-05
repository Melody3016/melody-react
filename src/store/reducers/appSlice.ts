import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { page404, routers } from '@/router/router';
import util from '@/libs/util';
import useAxios from '@/hooks/useAxios';
import { getMenuList } from '@/api';

export interface AppState {
  routers: any[];
  hasAddRouters: boolean;
  hasMenuData: boolean;
  menuData: IMenuListRes[];
  menuList: IMenuListRes[];
  navList: INav[];
}

const initialState: AppState = {
  routers,
  hasAddRouters: false,
  hasMenuData: false,
  menuData: [],
  menuList: [],
  navList: []
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
/* export const getMenuDataAsync = createAsyncThunk('app/fetchMenuData', async () => {
  const { fetchData } = useAxios();
  const response = await fetchData(getMenuList);
  // The value we return becomes the `fulfilled` action payload
  return response;
}); */

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    insetRouter: (state, action: PayloadAction<any>) => {
      if (state.hasAddRouters) return;
      if (!action.payload || !action.payload.length) return;
      const lastIndex = state.routers.length - 1;
      // 将后台返回封装好的routers添加到路由表中
      for (const item of action.payload) {
        state.routers[lastIndex].children?.push(item);
      }
      // 添加404路由
      state.routers.push(page404);
      state.hasAddRouters = true;
    },
    setHasMenuData: (state, action: PayloadAction<boolean>) => {
      state.hasMenuData = action.payload;
    },
    setHasAddRouters: (state, action: PayloadAction<boolean>) => {
      state.hasAddRouters = action.payload;
    },
    setMenuData: (state, action: PayloadAction<IMenuListRes[]>) => {
      state.menuData = action.payload;
      state.navList = action.payload.map(item => ({
        id: item.id,
        title: item.title,
        name: item.name,
        icon: item.icon,
        url: item.url
      }));
    },
    setMenuList: (state, action: PayloadAction<string>) => {
      state.menuList = util.handleMenuList(action.payload, state.menuData);
    }
    // setNavList: (state, action: PayloadAction<IMenuListRes[]>) => {
    //   state.navList = action.payload;
    // }
  }
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  /*  extraReducers: builder => {
    builder
      // .addCase(incrementAsync.pending, state => {
      //   state.status = 'loading';
      // })
      .addCase(getMenuDataAsync.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.menuData = action.payload;
      });
    // .addCase(incrementAsync.rejected, state => {
    //   state.status = 'failed';
    // });
  } */
});

export const { insetRouter, setHasMenuData, setMenuList, setMenuData, setHasAddRouters } =
  appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRouters = (state: RootState) => state.app.routers;
export const selectHasAddRouters = (state: RootState) => state.app.hasAddRouters;
export const selectHasMenuData = (state: RootState) => state.app.hasMenuData;
export const selectMenuList = (state: RootState) => state.app.menuList;
export const selectNavList = (state: RootState) => state.app.navList;
// export const selectMenuData = (state: RootState) => state.app.menuData;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/* export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  }; */

export default appSlice.reducer;
