import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

import type { ThemeType } from '@/types';
import type { MenuProps } from 'antd';

import { RouterMap } from '@/types';
import useThemeStore from '@/store/theme';

const themes: MenuProps['items'] = [
  {
    key: 'default',
    label: '简约灰',
  },
  {
    key: 'black',
    label: '夜间模式',
  },
];

const list: MenuProps['items'] = [
  {
    key: '0',
    label: '退出登录',
  },
];

export default memo(function Header({ userName }: { userName: string }) {
  const { theme, changeTheme } = useThemeStore();
  const navigation = useNavigate();

  const onChangeTheme = useCallback(
    (e: { key: string }) => {
      const theme = e.key as ThemeType;
      changeTheme(theme);
      window.document.documentElement.setAttribute('data-theme', theme);
    },
    [changeTheme],
  );

  const onUserClick = useCallback(
    (e: { key: string }) => {
      if (e.key === '0') {
        navigation(RouterMap.LOGIN);
      }
    },
    [navigation],
  );

  useEffect(() => {
    window.document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className='flex h-[70px] bg-[--background-header] text-[--font-primary] cursor-pointer'>
      <div className="w-1/2 text-[24px] flex leading-[70px] indent-[10px] tracking-[2px]">
        <span className='ml-3'>后台管理系统</span>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <Dropdown
          menu={{ items: themes, selectable: true, onClick: onChangeTheme, defaultSelectedKeys: [theme] }}
          className="p-[5px]"
        >
          <i className="text-[--icon-font] text-[30px] icon-zhuti_tiaosepan_o"></i>
        </Dropdown>
        <Dropdown menu={{ items: list, onClick: onUserClick }} className="p-[5px]">
          <div className="flex">
            <span className='mr-[5px] leading-[50px]'>
              <span style={{ marginRight: 2 }}>{userName}</span>
              <CaretDownOutlined />
            </span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
});
