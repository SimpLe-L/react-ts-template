import { redirect } from 'react-router-dom';

import { ls } from '@/utils/localStorage';

import { RouterMap, SettingFilds } from '@/types'

export function protectedLoader() {
  if (!ls.get(SettingFilds.ACCESS_TOKEN)) {
    return redirect(RouterMap.LOGIN);
  }
  return null;
}
