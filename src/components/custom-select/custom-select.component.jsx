import React from 'react';

import './custom-select.styles.scss';

const CustomSelect = ({
  options = [],
  onChange = () => {},
  defaultValue = 'DEFAULT',
  label = 'Selectionner...',
  name = '',
}) => {
  const renderOptions = () =>
    options &&
    options.length > 0 &&
    options.map((opt, idx) => {
      return (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      );
    });

  return (
    <div className='custom-select'>
      <select onChange={onChange} name={name} defaultValue={defaultValue}>
        <option value='DEFAULT' disabled hidden>
          {label}
        </option>
        {renderOptions(options)}
      </select>
    </div>
  );
};

export default CustomSelect;
