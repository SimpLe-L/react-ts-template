import { useMemo, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useTitle } from 'ahooks';
import { FloatButton } from 'antd';

import Header from '@/components/header';
import Menus from '@/components/menu';

// import { getAssetsFile } from '@/utils';
import { ls } from "@/utils/localStorage";

import { RouterMap } from "@/types";

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
const menus: MenuItem[] = [
  {
    label: '系统首页',
    key: RouterMap.HOME,
  }
];



const AppHome = () => {
  useTitle('react管理系统');
  const overFlowRef = useRef(null);

  const userName = useMemo(() => ls.get('userInfo')?.userName, []);

  const newMenus = useMemo(() => {
    const authMenus = ls.get('menu');
    return menus.filter((item) => {
      if (authMenus) {
        if (item && item.key) {
          return authMenus.includes((item.key as string).split('/')[1]);
        }
      }
      return [];
    });
  }, []);

  return (
    <div className='min-w-[1150px] h-full overflow-y-hidden'>
      <FloatButton.BackTop visibilityHeight={100} target={() => overFlowRef.current!} />
      <Header userName={userName} />
      <main className="flex h-[calc(100vh-70px)]">
        <aside className='bg-[--background-aside]'>
          <Menus menus={newMenus} />
        </aside>
        <div className='w-full overflow-auto bg-[--background-main]' ref={overFlowRef}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppHome;
