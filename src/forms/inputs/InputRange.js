import React,{ useState } from 'react';
import { formatterPeso } from '../../../helpers/formatterPeso'

export const InputRange = () => {
    const [range, setRange] = useState(null);

    return (
        <>
            <p for="points" class="form-label">Precio </p>
            <label for="points">0 </label>
            <input type="range" id="points" name="points" min="0" max="2000000000" step="10000" onChange={(event) => setRange(event.target.value)} className='form-range'></input>
            <label for="points">{range ? formatterPeso.format(range) : formatterPeso.format('2000000000') }</label>
        </>
    )
}