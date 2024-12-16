import { memo, useEffect, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Menu } from 'antd';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

interface Props {
  menus: MenuItem[];
}

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

export default memo(function Menus({ menus }: Props) {
  const location = useLocation();
  const navigation = useNavigate();

  const [selectedKey, setselectedKeys] = useState(['']);

  useEffect(() => {
    setselectedKeys([location.pathname]);
  }, [location]);

  const levelKeys = getLevelKeys(menus as LevelKeysProps[]);

  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const onClick = useCallback(
    (e: { key: string }) => {
      navigation(e.key);
    },
    [navigation],
  );

  return (
    <div className='overflow-y-auto h-full'>
      <Menu
        selectedKeys={selectedKey}
        openKeys={stateOpenKeys}
        mode="inline"
        className="w-[256px] bg-[--background-aside] !text-[--font-primary]"
        items={menus}
        onOpenChange={onOpenChange}
        onClick={onClick}
      ></Menu>
    </div>
  );
});
