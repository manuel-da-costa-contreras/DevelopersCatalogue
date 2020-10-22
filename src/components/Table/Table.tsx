import React, { ChangeEvent, ReactElement, useState } from 'react';

import Pagination from '@material-ui/lab/Pagination';

import usePagination from '../../shared/hooks/pagination';

import { TableProps } from './Table-props';
import { TableItem } from './TableList/TableList';
import { Developer } from 'src/models/DeveloperModel';
import { Modal } from '../Modal/Modal';

export const Table = (props: TableProps): ReactElement => {
  const [page, setPage] = useState<number>(1);
  const [editUser, setEditUser] = useState<Developer>(undefined);
  const perPage: number = 10;

  const filteredTable =
    props.developersData &&
    props.developersData.filter((item) => {
      return (
        item.name.first
          .concat(item.name.last)
          .toLowerCase()
          .includes(props.filters.searchText) ||
        item.name.last
          .concat(item.name.first)
          .toLowerCase()
          .includes(props.filters.searchText)
      );
    });

  const onClickEdit = (user: Developer) => {
    setEditUser(user);
  };

  const onSubmittedForm = (newDataCallback: any) => {
    setEditUser(null);

    return props.requestedEdit(newDataCallback);
  };

  const onCloseModal = () => {
    setEditUser(null);
  };

  const onClickRemove = (user: Developer) => {
    return props.requestedRemove(user);
  };

  const pageCount = Math.ceil(filteredTable.length / perPage);
  const pagination = usePagination(filteredTable, perPage);

  const onHandlePageChange = (
    e: ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page);
    pagination.jump(page);
  };

  return (
    <div className="container">
      <div className="table-header">
        <h1 className="table-title"> {props.tableTitle} </h1>
        <div className="table-search-bar-container">
          <p>{props.searchBarTitle}</p>
          <span>
            <input
              className="table-search-bar"
              placeholder={props.searchBarPlaceholder}
              onChange={props.searchBarText}
            />
          </span>
        </div>

        <button onClick={props.addButtonClick} className="primary-button">
          {props.addButton}
        </button>
      </div>
      <div className="table-container">
        <div className="table-pagination">
          <Pagination
            size="small"
            siblingCount={1}
            count={pageCount}
            onChange={onHandlePageChange}
            page={page}
            color={'secondary'}
          />
        </div>
        <div className="table-column">
          <p>{props.name}</p>
          <p>{props.city}</p>
          <p>{props.mail}</p>
          <p>{props.cellphone}</p>
          <p>{props.options}</p>
        </div>
        {pagination.currentData().map((item: Developer) => {
          return (
            <React.Fragment key={item.login.uuid}>
              <TableItem
                developerItem={item}
                editButtonAction={onClickEdit}
                removeButtonAction={onClickRemove}
              />
            </React.Fragment>
          );
        })}
      </div>
      <Modal
        editUser={editUser}
        onSubmittedForm={onSubmittedForm}
        onCloseModal={onCloseModal}
      />
    </div>
  );
};

Table.defaultProps = {
  tableTitle: 'Developers',
  searchBarTitle: 'Search',
  searchBarPlaceholder: 'Find Developer...',
  name: 'Name',
  city: 'City',
  mail: 'Email',
  cellphone: 'Cellphone',
  options: 'Options',
  addButton: 'New Developer',
};
