import React from 'react';
import style from './style.scss';

const InflowOutflow = props => {
  const { amount } = props;
  return (
    <h3 className={style.padding}>
      <span className={amount > 0 ? style.greenSign : style.redSign}>{`${amount > 0 ? '+' : '-'}`}</span>
      {Math.abs(amount)}%
    </h3>
  );
}


export default InflowOutflow;
