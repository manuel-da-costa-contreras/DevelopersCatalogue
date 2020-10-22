import React, { ReactElement } from 'react';

import { Button, Container, TextField } from '@material-ui/core';

import ModalComponent from 'react-modal';

import { ModalProps } from './Modal-props';
import { Developer } from 'src/models/DeveloperModel';

const Modal = (props: ModalProps): ReactElement => {
  const onSubmitForm = (e: any) => {
    e.preventDefault();
    const json = localStorage.getItem('data');
    const data: Developer[] = JSON.parse(json);
    const userIndex: number = data.findIndex(
      (user: Developer) => user.login.uuid == props.editUser.login.uuid
    );
    const newData: Developer = data[userIndex];
    newData.name.first = e.target.elements.firstName.value;
    newData.name.last = e.target.elements.lastName.value;
    newData.location.city = e.target.elements.city.value;
    newData.email = e.target.elements.email.value;
    newData.cell = e.target.elements.cell.value;

    props.onSubmittedForm(newData);
  };

  return (
    <div>
      <ModalComponent
        isOpen={!!props.editUser}
        onRequestClose={props.onSubmittedForm}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className="modal"
      >
        <Container maxWidth="lg">
          {props.editUser && (
            <form className="form-class" onSubmit={onSubmitForm}>
              <img className="img-tag" src={props.editUser.picture.large} />
              <div className="form-fields">
                <TextField
                  label="First Name"
                  name="firstName"
                  margin="normal"
                  style={{ margin: 8 }}
                  fullWidth
                  defaultValue={props.editUser.name.first}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  margin="normal"
                  style={{ margin: 8 }}
                  fullWidth
                  defaultValue={props.editUser.name.last}
                />
                <TextField
                  label="City"
                  name="city"
                  margin="normal"
                  style={{ margin: 8 }}
                  fullWidth
                  defaultValue={props.editUser.location.city}
                />
                <TextField
                  label="Email"
                  name="email"
                  margin="normal"
                  style={{ margin: 6 }}
                  fullWidth
                  defaultValue={props.editUser.email}
                />
                <TextField
                  label="Cellphone"
                  name="cell"
                  margin="normal"
                  style={{ margin: 8 }}
                  fullWidth
                  defaultValue={props.editUser.cell}
                />
              </div>
              <div className="form-buttons">
                <Button type="submit" color="primary" variant="outlined">
                  {props.submitButtonText}
                </Button>
                <Button
                  onClick={props.onCloseModal}
                  color="primary"
                  variant="outlined"
                >
                  {props.cancelButtonText}
                </Button>
              </div>
            </form>
          )}
        </Container>
      </ModalComponent>
    </div>
  );
};

Modal.defaultProps = {
  submitButtonText: 'Submit',
  cancelButtonText: 'Cancel',
};

export { Modal };
