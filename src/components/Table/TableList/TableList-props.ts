import { Developer } from 'src/models/DeveloperModel';

export interface TableListProps {
  developerItem: Developer;

  editButtonName?: string;
  editButtonAction?: (item) => void;

  removeButtonName?: string;
  removeButtonAction?: (item) => void;
}
