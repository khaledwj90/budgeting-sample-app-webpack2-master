import React, { Component } from 'react';
import ItemDetails from 'containers/ItemDetails';

class ItemDetailsRoute extends Component {
  render() {
    const {match:{params}} = this.props;
    return <ItemDetails itemId={params.itemId}/>

  }
}

export default ItemDetailsRoute;
