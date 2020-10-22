import React, { ReactElement } from 'react';

import { TableListProps } from './TableList-props';

export const TableItem = (props: TableListProps): ReactElement => {
  const onClickEditButton = () => {
    return props.editButtonAction(props.developerItem);
  };

  const onClickDeleteButton = () => {
    return props.removeButtonAction(props.developerItem);
  };

  return (
    <>
      <div className="table-column">
        <p>
          {props.developerItem.name.first} {props.developerItem.name.last}
        </p>
        <p>{props.developerItem.location.city}</p>
        <p>{props.developerItem.email}</p>
        <p>{props.developerItem.cell}</p>
        <div className="button-container">
          <button
            onClick={onClickEditButton}
            className="primary-button option-button"
          >
            {props.editButtonName}
          </button>
          <button
            onClick={onClickDeleteButton}
            className="secondary-button option-button"
          >
            {props.removeButtonName}
          </button>
        </div>
      </div>
    </>
  );
};

TableItem.defaultProps = {
  editButtonName: 'Edit',
  removeButtonName: 'Delete',
};
