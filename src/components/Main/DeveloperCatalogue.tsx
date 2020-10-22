import React, { ReactElement, useState, useEffect } from 'react';

import Loader from 'react-spinners/RotateLoader';

import { Filters } from 'src/models/FiltersModel';
import { Developer } from 'src/models/DeveloperModel';
import { Table } from '../Table/Table';
import Header from '../Header/Header';
import { getDevelopers, getDeveloper } from '../../api/data';

// Loader Override Css
const override = `
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

export function CatalogueApp(): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    searchText: '',
    sortBy: 'Active',
  });
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [newData, setNewData] = useState<Developer>(null);

  const newDataFromEdit = (callback: Developer) => {
    setNewData(callback);
  };

  const requestedRemoveClick = (callback: Developer) => {
    const userIndex = developers.findIndex(
      (item) => item.login.uuid === callback.login.uuid
    );
    const newArray = developers;
    newArray.splice(userIndex, 1);

    setDevelopers([...newArray]);
  };

  const onChangeTextFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      searchText: e.target.value.toLowerCase().replace(/\s/g, ''),
      sortBy: '',
    });
  };

  // Adds a new Developer
  const addDeveloper = async () => {
    try {
      const data = await getDeveloper();

      data.results.map((item: Developer) => {
        setDevelopers([...developers, item]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Initialization Effect
   * Load data directly from localstorage if this one exists, if not
   * loads data directly from the API
   */
  useEffect(() => {
    const json = localStorage.getItem('data');
    const data = [].concat(JSON.parse(json)).filter(Boolean);
    if (developers !== null && data.length > 1) {
      try {
        setDevelopers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      (async (): Promise<void> => {
        try {
          const data = await getDevelopers(50);

          setDevelopers(data.results);
          localStorage.setItem('data', JSON.stringify(data.results));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [!developers]);

  // updates localstorage if developers length increases
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(developers));
  }, [developers.length, developers]);

  /**
   * It modified the data that came from the Edit Button action in Table List
   * With Redux, shouln't be this complicated (Self-challenge)
   * This is hell prop chaining
   */
  useEffect(() => {
    if (newData) {
      const json = localStorage.getItem('data');
      const data = JSON.parse(json);

      const userIndex: number = data.findIndex(
        (item: Developer) => item.login.uuid === newData.login.uuid
      );
      data[userIndex] = newData;
      setDevelopers(data);
      localStorage.setItem('data', JSON.stringify(data));
      setNewData(null);
    }
  }, [!newData]);

  // Early Return
  if (loading) {
    return (
      <Loader size={15} color={'#1B80DB'} loading={loading} css={override} />
    );
  }

  return (
    <div>
      <Header />
      <Table
        requestedEdit={newDataFromEdit}
        requestedRemove={requestedRemoveClick}
        addButtonClick={addDeveloper}
        searchBarText={onChangeTextFilter}
        developersData={developers}
        filters={filters}
      />
    </div>
  );
}
//
