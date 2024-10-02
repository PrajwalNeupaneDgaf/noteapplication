// src/PartialsOfNQS/Check.jsx
import React, { useContext } from 'react';
import NQSContextCreate from '../NQSContextCreate';

function Check() {
  const { num } = useContext(NQSContextCreate);

  if (num === undefined) {
    return <div>Error: Context is not provided.</div>;
  }

  return (
    <div>{num}</div>
  );
}

export default Check;
