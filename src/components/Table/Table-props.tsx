import { Developer } from 'src/models/DeveloperModel';
import { Filters } from 'src/models/FiltersModel';

export interface TableProps {
  developersData: Developer[];
  tableTitle?: string;
  name?: string;
  city?: string;
  mail?: string;
  cellphone?: string;
  options?: string;
  searchBarTitle?: string;
  searchBarPlaceholder?: string;
  filters?: Filters;

  requestedEdit?: (callback: Developer) => void;
  requestedRemove?: (callback: Developer) => void;

  addButton?: string;
  addButtonClick: () => void;

  searchBarText: (event?: any) => void;
}
