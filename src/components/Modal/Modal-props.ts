import { Developer } from 'src/models/DeveloperModel';

export interface ModalProps {
  editUser: Developer;

  submitButtonText?: string;
  onCloseModal?: () => void;

  cancelButtonText?: string;
  onSubmittedForm: (callback: any) => void;
}
