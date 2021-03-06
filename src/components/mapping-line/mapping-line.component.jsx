import React, { useContext } from 'react';

import { MappingContext } from '../../providers/mapping/mapping.provider';
import SpanElement from '../span-element/span-element.component';
import IconButton from '../icon-button/icon-button.component';

import './mapping-line.styles.scss';

const MappingLine = ({ fields, line }) => {
  const { deleteLine, toggleLineEdit } = useContext(MappingContext);

  const handleDeleteClick = () => {
    window.confirm(
      `Supprimer ${line.name} ? cela est irréversible et effacera toutes les données lieées`
    ) && deleteLine(line);
  };

  const handleEditClick = () => {
    toggleLineEdit(line.id);
  };

  return (
    <div className='row'>
      {line &&
        fields.map((field, idx) => {
          const name = Array.isArray(line[field.name])
            ? line[field.name]
              ? line[field.name].toString()
              : ''
            : line[field.name];
          return <SpanElement key={idx}>{name}</SpanElement>;
        })}
      <SpanElement>
        <IconButton
          icon='&#9998;'
          onClick={() => handleEditClick()}
          title='Editer'
        />
        <IconButton
          icon='&#10006;'
          onClick={() => handleDeleteClick()}
          title='Supprimer'
        />
      </SpanElement>
    </div>
  );
};

export default MappingLine;
