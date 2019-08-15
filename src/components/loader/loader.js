import React from 'react';
import preloader from '../../images/preloader.gif';

export const Loader = () => {
    return (
        <div className="loader">
                <img src={preloader} alt="Preloader"/>
            </div>
    )
}