import React, { Fragment, useEffect, useState } from 'react';

function useVarA() {
  const [varA, setVarA] = useState(0);
  useEffect(() => {
    if(varA > 5) return;
    const timeoutId = setTimeout(() => {
      setVarA(varA+1);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [varA]);
  return [varA, setVarA];
}

function useVarB() {
  const [varB, setVarB] = useState(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVarB(varB+1);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [varB]);
  return [varB, setVarB];
}

export default function Test(props) {
  console.log('props====', props);
  const [a] = useVarA();
  const [b] = useVarB();
  return (
    <Fragment>
      Var A: {a}, Vat B: {b}
    </Fragment>
  );
}