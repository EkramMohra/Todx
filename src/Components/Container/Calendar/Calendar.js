import React from 'react';
import PropTypes from 'prop-types';

const Calendar = () => {

    return (
        <div>
            {week.map(day => <button>day</button>)}
        </div>
    );
};

Calendar.propTypes = {};

export default Calendar;