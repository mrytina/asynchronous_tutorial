import React from 'react';

export function Test() {
    const examplePromise = (success) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                success ? resolve('Promise Resolved') : reject('Promise Rejected');
            }, 1000);
        });
    };
    const handleClickReject = () => {
        console.log('start reject');
        examplePromise(false).then((successMessage) => {
            return {message: successMessage, more: 'another message'};
        }).then((anotherMessage) => {
            console.log(anotherMessage);
        }).catch((err) => {
            console.error('My Error:', err);
        });
        console.log('end reject');
    };

    const handleClickRejectAwait = async() => {
        console.log('start reject await');
        try {
            const data = await examplePromise(false);
            console.log(data);
        } catch (err) {
            console.log('My Error:', err);
        }
        console.log('start reject await');
    };

    const handleClickResolve = () => {
        console.log('start resolve');
        examplePromise(true).then((successMessage) => {
            return {message: successMessage, more: 'another message'};
        }).then((anotherMessage) => {
            console.log(anotherMessage);
        }).catch((err) => {
            console.error('My Error:', err);
        });
        console.log('end resolve');
    };

    const handleClickResolveAwait = async() => {
        console.log('start resolve await');
        try {
            const data = await examplePromise(true);
            console.log(data);
        } catch (err) {
            console.log('My Error:', err);
        }
        console.log('end resolve await');
    };

    return (
        <div>
            <h4 className='text-success'>Test</h4>
            <div className="btn-group">
                <button id="reject" className="btn btn-outline-primary" onClick={handleClickReject}>Reject</button>
                <button id="rejectAwait" className="btn btn-outline-primary" onClick={handleClickRejectAwait}>Reject Await</button>
                <button id="resolve" className="btn btn-outline-primary" onClick={handleClickResolve}>Resolve</button>
                <button id="resolveAwait" className="btn btn-outline-primary" onClick={handleClickResolveAwait}>Resolve Await</button>
            </div>
        </div>
    );
};