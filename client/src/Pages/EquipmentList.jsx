// TODO: filtering needed?

import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import EquipmentTable from '../Components/EquipmentTable';

const DEFAULT_SORT_FIELD = 'name';
const DEFAULT_SORT_ORDER = 'asc';

const fetchEquipment = (name, type, sortField, sortOrder) => {
  const queryParams = [];

  if (name) {
    queryParams.push(`name=${name}`);
  }

  if (type) {
    queryParams.push(`type=${type}`);
  }

  queryParams.push(`sortField=${sortField}`);
  queryParams.push(`sortOrder=${sortOrder}`);

  const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

  return fetch(`/api/equipment${queryString}`).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD);
  const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_ORDER);

  useEffect(() => {
    fetchEquipment(nameFilter, typeFilter, sortField, sortOrder).then(
      (equipment) => {
        setLoading(false);
        setEquipment(equipment);
      }
    );
  }, [typeFilter, nameFilter, sortField, sortOrder]);

  if (loading) {
    return <Loading />;
  }

  const NameInput = (
    <input
      type='text'
      placeholder='Filter by Name'
      value={nameFilter}
      onChange={(e) => setNameFilter(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          setNameFilter('');
        }
      }}
    />
  );

  const typeInput = (
    <input
      type='text'
      placeholder='Filter by Type'
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          setTypeFilter('');
        }
      }}
    />
  );

  const handleDelete = (id) => {
    deleteEquipment(id);

    setEquipment((equipment) => {
      return equipment.filter((equipment) => equipment._id !== id);
    });
  };

  const handleSort = (field) => {
    let newSortField = sortField;
    let newSortOrder = sortOrder;

    if (sortField === field) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      newSortField = field;
      newSortOrder = 'asc';
    }

    setSortField(newSortField);
    setSortOrder(newSortOrder);

    fetchEquipment(nameFilter, typeFilter, newSortField, newSortOrder).then(
      (sortedEquipment) => {
        setEquipment(sortedEquipment);
      }
    );
  };

  const resetSort = () => {
    setSortField(DEFAULT_SORT_FIELD);
    setSortOrder(DEFAULT_SORT_ORDER);
    fetchEquipment(
      typeFilter,
      nameFilter,
      DEFAULT_SORT_FIELD,
      DEFAULT_SORT_ORDER
    ).then((sortedEquipment) => {
      setEquipment(sortedEquipment);
    });
  };

  return (
    <div>
      <div className='filters'>
        <button onClick={resetSort}>Reset Sort</button>
        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        {showFilters && NameInput}
        {showFilters && typeInput}
      </div>
      <EquipmentTable
        equipment={equipment}
        onDelete={handleDelete}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default EquipmentList;
