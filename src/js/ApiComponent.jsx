import React, {useEffect, useReducer} from 'react';
import _std from './shared/helpers.js';

const reducer = (state, action) => {
    const {type, ...other} = action;
    switch (type) {
    case 'change':
        state = {...state, ...other};
        break;
    default:
        throw new Error();
    }
    return state;
};
export function Api() {
    const [state, dispatch] = useReducer(reducer, {method: 'GET', payload: '', requests: []});
    const {method, payload, result, requests} = state;
    const show = {};
    /* const sendAjax = async(method, api, payload) => {
        const reqs = [...requests];
        const start = performance.now();
        const result = await _std.sendAjax(method, api, payload);
        const end = performance.now();
        reqs.push({time: end - start, method, api, result});
        dispatch({type: 'change', result, requests: reqs});
    }; */
    /* const sendAjax = (method, api, payload) => {
        const reqs = [...requests];
        const start = performance.now();
        const result = _std.sendAjax(method, api, payload);
        const end = performance.now();
        reqs.push({time: end - start, method, api, result});
        dispatch({type: 'change', result, requests: reqs});
    }; */
    const sendAjax = (method, api, payload) => {
        const reqs = [...requests];
        const start = performance.now();
        _std.sendAjaxCallback(method, api, payload, (result) => {
            const end = performance.now();
            reqs.push({time: end - start, method, api, result});
            dispatch({type: 'change', result, requests: reqs});
        });
    };
    const handleChange = (event) => {
        const el = event?.target;
        if (el) {
            const {name, value} = el;
            dispatch({type: 'change', [name]: value});
        }
    };
    const handleClick = () => {
        const FIRST = '/api/first';
        const SECOND = '/api/second';
        const send = async() => {
            sendAjax(method, method === 'GET' ? FIRST : SECOND, method === 'GET' ? undefined : {payload});
        };
        send();
    };
    useEffect(() => {
        const load = async() => {
            sendAjax('GET', '/api/first');
        };
        load();
    }, []);
    if (method !== 'GET') {
        show.payload = (<div className='mb-3'>
            <label htmlFor="method">Payload</label>
            <input name="payload" value={payload} className='form-control' onChange={handleChange}/>
        </div>);
    }
    return (
        <div>
            <h4 className='text-success'>Api</h4>
            <form>
                <div className='mb-3'>
                    <label htmlFor="method">Method</label>
                    <select name="method" className='form-control' onChange={handleChange}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                    </select>
                </div>
                {show.payload}
                <button type="button" className='btn btn-primary' onClick={handleClick}>Submit</button>
                <div className='mb-3'>
                    <label htmlFor="result">Result</label>
                    <pre><code name="result" className='form-control'>{JSON.stringify(result, null, 4)}</code></pre>
                </div>
                <div className='mb-3'>
                    <label htmlFor="requests">Requests</label>
                    <pre><code name="requests" className='form-control'>{JSON.stringify(requests, null, 4)}</code></pre>
                </div>
            </form>
        </div>
    );
};