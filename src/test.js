import React,{ forwardRef,useRef,useImperativeHandle, useState } from 'react';

function InputWithLabel(props) {
  // 这里的myRef为通过外部打入的父级ref节点
  const { label,myRef } = props;
  const [value,setValue] = useState('');

  const _innerRef = useRef(null);

  const handleChange = (e)=>{
    const val = e.target.value;
    setValue(val);
  }

  const getValue = ()=>{
    return value;
  }

  useImperativeHandle(myRef,()=>({
    getValue,
    focus(){
      const node = _innerRef.current;
      if(node && node.focus){
        node.focus();
      }
    }
  }));

  return (
    <div>
      <span>{label}:</span>
      <input type='text' ref={_innerRef} value={value} onChange={handleChange} />
    </div>
  );
}

// 这里用forwardRef来承接得到父级传入的ref节点，并将其以参数的形式传给子节点
const RefInput = forwardRef((props,ref)=>(
  <InputWithLabel {...props} myRef={ref}></InputWithLabel>
));

// 调用该RefInput的过程
function Test(props) {
  // 通过useRef hook 获得相应的ref节点
  const inputRef = useRef(null);
  const handleFocus = ()=>{
    const node = inputRef.current;
    if(node && node.focus){
      node.focus();
    }
  }
  return (
    <div>
      <RefInput ref={inputRef} label='姓名'></RefInput>
      <button onClick={handleFocus}>focus</button>
    </div>
  );
}

export default React.memo(Test);
