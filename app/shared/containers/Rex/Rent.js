// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';

import RexInterfaceAbout from '../../components/Rex/Rent/About';
import RexInterfaceFund from '../../components/Rex/shared/Fund';
import RexInterfaceRentManage from '../../components/Rex/Rent/Manage';
import RexInterfaceRentLoans from '../../components/Rex/Rent/Loans';
import WalletPanelLocked from '../../components/Wallet/Panel/Locked';

import RexActions from '../../actions/system/rexi';
import TableAction from '../../actions/table';
import SystemStateActions from '../../actions/system/systemstate';
import WalletActions from '../../actions/wallet';
import RexFetchActions from '../../actions/rex';

type Props = {
  actions: {},
  accounts: {},
  balance: {},
  blockExplorers: {},
  connection: {},
  keys: {},
  settings: {},
  system: {},
  t: {},
  tables: {},
  validate: {},
  wallet: {},
};

class RexRent extends Component<Props> {
  props: Props;

  render() {
    const {
      accounts,
      actions,
      balance,
      blockExplorers,
      connection,
      keys,
      settings,
      system,
      t,
      tables,
      validate,
      wallet,
    } = this.props;

    const panes = [
      {
        menuItem: {
          key: 'about',
          icon: 'info',
          content: t('rex_interface_menu_about')
        },
        pane: {
          key: 'about',
          content: (
            <RexInterfaceAbout />
          )
        }
      },
      {
        menuItem: {
          key: 'fund',
          icon: 'arrow down',
          content: t('rex_interface_menu_fund')
        },
        pane: {
          key: 'fund',
          content: (
            <RexInterfaceFund
              actions={actions}
              balance={balance}
              blockExplorers={blockExplorers}
              connection={connection}
              settings={settings}
              system={system}
              tables={tables}
            />
          )
        }
      },
      {
        menuItem: {
          key: 'rent_resources',
          icon: 'arrow right',
          content: t('rex_interface_menu_rent_resources')
        },
        pane: {
          key: 'rent_resources',
          content: (
            <RexInterfaceRentManage
              accounts={accounts}
              actions={actions}
              blockExplorers={blockExplorers}
              connection={connection}
              settings={settings}
              system={system}
              tables={tables}
            />
          )
        }
      },
      {
        menuItem: {
          key: 'rent_loans',
          icon: 'random',
          content: t('rex_interface_menu_rent_loans')
        },
        pane: {
          key: 'rent_loans',
          content: (
            <RexInterfaceRentLoans
              accounts={accounts}
              actions={actions}
              blockExplorers={blockExplorers}
              connection={connection}
              settings={settings}
              system={system}
              tables={tables}
            />
          )
        }
      }
    ];

    const isUnlocked = (keys && keys.key) || ['watch', 'ledger'].includes(settings.walletMode);
    const isLocked = !isUnlocked;

    return (
      <React.Fragment>
        {isLocked ? (
          <WalletPanelLocked
            actions={actions}
            settings={settings}
            validate={validate}
            wallet={wallet}
          />
        ) : (
          <Tab
            defaultActiveIndex={0}
            onTabChange={this.onTabChange}
            panes={panes}
            renderActiveOnly={false}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...RexActions,
      ...RexFetchActions,
      ...SystemStateActions,
      ...TableAction,
      ...WalletActions,
    }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    balance: state.balances[state.settings.account],
    blockExplorers: (state.connection && state.blockexplorers[state.connection.chainKey]) || {},
    connection: state.connection,
    keys: state.keys,
    settings: state.settings,
    tables: state.tables,
    validate: state.validate,
    wallet: state.wallet,
  };
}

export default translate('rex')(connect(mapStateToProps, mapDispatchToProps)(RexRent));
