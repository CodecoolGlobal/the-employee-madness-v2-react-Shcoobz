import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import EmployeeTable from '../Components/EmployeeTable';

const DEFAULT_SORT_FIELD = 'name';
const DEFAULT_SORT_ORDER = 'asc';

const fetchEmployees = (position = '', level = '', sortField, sortOrder) => {
  const queryParams = [];

  if (position) {
    queryParams.push(`position=${position}`);
  }

  if (level) {
    queryParams.push(`level=${level}`);
  }

  queryParams.push(`sortField=${sortField}`);
  queryParams.push(`sortOrder=${sortOrder}`);

  const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

  return fetch(`/api/employees${queryString}`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [positionFilter, setPositionFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD);
  const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_ORDER);

  useEffect(() => {
    fetchEmployees(positionFilter, levelFilter, sortField, sortOrder).then(
      (employees) => {
        setLoading(false);
        setEmployees(employees);
      }
    );
  }, [positionFilter, levelFilter, sortField, sortOrder]);

  if (loading) {
    return <Loading />;
  }

  const positionInput = (
    <input
      type='text'
      placeholder='Filter by Position'
      value={positionFilter}
      onChange={(e) => setPositionFilter(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          setPositionFilter('');
        }
      }}
    />
  );

  const levelInput = (
    <input
      type='text'
      placeholder='Filter by Level'
      value={levelFilter}
      onChange={(e) => setLevelFilter(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          setLevelFilter('');
        }
      }}
    />
  );

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
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

    fetchEmployees(
      positionFilter,
      levelFilter,
      newSortField,
      newSortOrder
    ).then((sortedEmployees) => {
      setEmployees(sortedEmployees);
    });
  };

  const resetSort = () => {
    setSortField(DEFAULT_SORT_FIELD);
    setSortOrder(DEFAULT_SORT_ORDER);
    fetchEmployees(
      positionFilter,
      levelFilter,
      DEFAULT_SORT_FIELD,
      DEFAULT_SORT_ORDER
    ).then((sortedEmployees) => {
      setEmployees(sortedEmployees);
    });
  };

  return (
    <div>
      <div className='filters'>
        <button onClick={resetSort}>Reset Sort</button>
        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        {showFilters && positionInput}
        {showFilters && levelInput}
      </div>
      <EmployeeTable
        employees={employees}
        onDelete={handleDelete}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default EmployeeList;
