/**
 * @format
 */

import 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { render } from '@testing-library/react-native';
import Info from '../components/Info';
import { ContextLoadedProvider } from '../app/context';

import {
  Address,
  AddressBookEntry,
  ErrorModalData,
  InfoType,
  ReceivePageState,
  SendPageState,
  SendProgress,
  SyncStatus,
  SyncStatusReport,
  ToAddr,
  TotalBalance,
  Transaction,
  WalletSeed,
  WalletSettings,
} from '../app/AppState';

jest.useFakeTimers();
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
jest.mock('react-native-localize', () => ({
  getNumberFormatSettings: () => {
    return {
      decimalSeparator: '.', // us
      groupingSeparator: ',', // us
    };
  },
}));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// test suite
describe('Component Info - test', () => {
  //unit test
  test('Info - price with us (.) decimal point', () => {
    const state = {
      navigation: {} as StackScreenProps<any>['navigation'],
      route: {} as StackScreenProps<any>['route'],
      dimensions: {} as {
        width: number;
        height: number;
        orientation: 'portrait' | 'landscape';
        deviceType: 'tablet' | 'phone';
        scale: number;
      },

      syncStatusReport: new SyncStatusReport(),
      addressPrivateKeys: new Map(),
      addresses: [] as Address[],
      addressBook: [] as AddressBookEntry[],
      transactions: [] as Transaction[],
      sendPageState: new SendPageState(new ToAddr(0)),
      receivePageState: new ReceivePageState(),
      rescanning: false,
      wallet_settings: new WalletSettings(),
      syncingStatus: {} as SyncStatus,
      errorModalData: new ErrorModalData(),
      sendProgress: new SendProgress(),
      walletSeed: {} as WalletSeed,
      isMenuDrawerOpen: false,
      selectedMenuDrawerItem: '' as string,
      aboutModalVisible: false,
      computingModalVisible: false,
      settingsModalVisible: false,
      infoModalVisible: false,
      rescanModalVisible: false,
      seedViewModalVisible: false,
      seedChangeModalVisible: false,
      seedBackupModalVisible: false,
      seedServerModalVisible: false,
      syncReportModalVisible: false,
      poolsModalVisible: false,
      newServer: '' as string,
      uaAddress: '' as string,
      info: {
        testnet: false,
        serverUri: 'https://zcash.es',
        latestBlock: 2000100,
        connections: 0,
        version: '3.3.3.0',
        verificationProgress: 0,
        currencyName: 'ZEC',
        solps: 0,
        zecPrice: 33.33,
        defaultFee: 1000,
        encrypted: false,
        locked: false,
        chain_name: 'mainnet',
      } as InfoType,
      translate: () => 'translated text',
      totalBalance: new TotalBalance(),
    };
    state.totalBalance.total = 1.12345678;
    const onClose = jest.fn();
    const text: any = render(
      <ContextLoadedProvider value={state}>
        <Info closeModal={onClose} />
      </ContextLoadedProvider>,
    ).toJSON();
    expect(text.type).toBe('RCTSafeAreaView');
    expect(text.children[1].children[0].children[0].children[5].children[1].children[0]).toBe('$ 33.33');
  });
});
