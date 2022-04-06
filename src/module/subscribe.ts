/*
 * Copyright 2022 Nightingale Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { IStore } from '@/store/common';
import { IState } from '@/store/warningInterface/subscribe';

const initData: any = {
  curShieldData: {}
};

const SubscribeStore: IStore<IState> = {
  namespace: 'subscribe',
  state: initData,
  reducers: {
    saveData(state: IState, payload: any) {
      return { ...state, [payload.prop]: payload.data };
    },
  },
  effects: {
    *setCurShieldData({ data }, { put }) {
      // const { dat: data } = yield getCommonClusters();
      const tags = data.tags.map(item => {
        return {
          ...item,
          value: item.func === 'in' ? item.value.split(' ').join('\n') : item.value
        }
      })
      yield put({
        type: 'saveData',
        prop: 'curShieldData',
        data: {
          ...data,
          tags
        },
      });
    }
  },
};

export default SubscribeStore;
