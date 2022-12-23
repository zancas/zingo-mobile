/**
 * @format
 */

import 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

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
import { render } from '@testing-library/react-native';
import SyncReport from '../components/SyncReport';
import { ContextLoadedProvider } from '../app/context';

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
describe('Component SyncReport - test', () => {
  //snapshot test
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
    info: {} as InfoType,
    translate: () => 'translated text',
    totalBalance: new TotalBalance(),
  };
  state.info.currencyName = 'ZEC';
  state.totalBalance.total = 1.12345678;
  state.walletSeed.birthday = 1500100;
  state.syncStatusReport.syncID = 1;
  state.syncStatusReport.inProgress = true;
  state.syncStatusReport.currentBatch = 5;
  state.syncStatusReport.totalBatches = 50;
  state.syncStatusReport.currentBlock = 1800100;
  state.syncStatusReport.lastBlockWallet = 1800000;
  state.syncStatusReport.lastBlockServer = 1900100;
  state.syncStatusReport.secondsPerBatch = 122;
  state.syncStatusReport.process_end_block = 1600100;
  const onClose = jest.fn();
  test('Matches the snapshot SyncReport', () => {
    const info: any = render(
      <ContextLoadedProvider value={state}>
        <SyncReport closeModal={onClose} />
      </ContextLoadedProvider>,
    );
    expect(info.toJSON()).toMatchSnapshot();
  });
});
