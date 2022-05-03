import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice';


function Test(props) {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [ value, setValue ] = useState();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return(
        <div className="flex flex-col" >
            <span>Count: {count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <input type="text" value={value} onChange={handleChange} />
            <button onClick={() => dispatch(incrementByAmount(parseInt(value)))}>add amount</button>
        </div>
    )
}

export default Test;
