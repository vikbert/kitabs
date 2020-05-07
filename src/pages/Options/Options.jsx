import React from 'react';
import './Options.css';

const Title = ({name}) => {
    return <h5>{name}</h5>;
};

const Options = () => {

    return (
        <div className="OptionsContainer">
            <Title name="option page"/>
        </div>
    );
};

export default Options;
