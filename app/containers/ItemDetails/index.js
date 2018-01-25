import React, {Component} from 'react';
import {connect} from 'react-redux';
import {injectAsyncReducers} from 'store';
import { withRouter } from 'react-router'
import DonutChart from 'components/DonutChart';
import {Row, Button} from 'reactstrap';
import {getTransactions, getInflowBalance, getOutflowBalance} from 'selectors/transactions';
import transactionReducer from 'modules/transactions';
import InflowOutflow from './Components/InflowOutflow';
import _ from 'lodash';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
});

class ItemDetails extends Component {
  render() {
    const {itemId, inflow, outflow, history} = this.props;
    const itemData = _.find(this.props.transactions, item => item.id == itemId);
    const budget = Math.round(inflow + Math.abs(outflow));
    const inflowPercentage = (inflow / budget * 100).toFixed(2);
    const outflowPercentage = (outflow / budget * 100).toFixed(2);
    const chartData = [
      {value: Math.abs(itemData.value), description: itemData.description},
      {value: budget, description: 'Total Budget'},
    ];

    return (
      <section>
        <h1>{itemData.description}</h1>
        <Row>
          <InflowOutflow amount={inflowPercentage}/>
          <InflowOutflow amount={outflowPercentage}/>
        </Row>
        <Row>
          <DonutChart data={chartData} dataLabel="description" dataKey="value"/>
        </Row>
        <Row>
          <Button onClick={()=>{history.goBack()}} color="secondary">BACK</Button>
        </Row>

      </section>
    );
  }
}


const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflow: getInflowBalance(state),
  outflow: getOutflowBalance(state),
});

export default connect(mapStateToProps)(withRouter(ItemDetails));
