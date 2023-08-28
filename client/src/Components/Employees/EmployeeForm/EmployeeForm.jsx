import { useState, useEffect } from 'react';

import fetchAvailableEquipment from '../../../Utility/Equipment/fetchAvailableEquipment';
import fetchFavoriteBrands from '../../../Utility/Equipment/fetchFavoriteBrands';

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? '');
  const [level, setLevel] = useState(employee?.level ?? '');
  const [position, setPosition] = useState(employee?.position ?? '');
  const [availableEquipment, setAvailableEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(employee?.equipment ?? '');
  const [favoriteBrands, setFavoriteBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(employee?.favoriteBrand?._id ?? '');

  useEffect(() => {
    const loadAvailableEquipment = async () => {
      const fetchedEquipment = await fetchAvailableEquipment();
      setAvailableEquipment(fetchedEquipment);
    };

    const loadFavoriteBrands = async () => {
      const fetchedBrands = await fetchFavoriteBrands();
      setFavoriteBrands(fetchedBrands);
    };

    loadAvailableEquipment();
    loadFavoriteBrands();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipment: selectedEquipment,
        favoriteBrand: selectedBrand,
      });
    }

    return onSave({
      name,
      level,
      position,
      equipment: selectedEquipment,
      favoriteBrand: selectedBrand,
    });
  };

  return (
    <form className='EmployeeForm' onSubmit={onSubmit}>
      <div className='control'>
        <label htmlFor='name'>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name='name'
          id='name'
        />
      </div>

      <div className='control'>
        <label htmlFor='firstName'>First Name:</label>
        <input
          value={employee ? employee.firstName : ''}
          onChange={(e) => setName(e.target.value)}
          name='firstName'
          id='firstName'
        />
      </div>

      <div className='control'>
        <label htmlFor='middleName'>Middle Name:</label>
        <input
          value={employee ? employee.middleName : ''}
          onChange={(e) => setName(e.target.value)}
          name='middleName'
          id='middleName'
        />
      </div>

      <div className='control'>
        <label htmlFor='lastName'>Last Name:</label>
        <input
          value={employee ? employee.lastName : ''}
          onChange={(e) => setName(e.target.value)}
          name='lastName'
          id='lastName'
        />
      </div>

      <div className='control'>
        <label htmlFor='level'>Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name='level'
          id='level'
        />
      </div>

      <div className='control'>
        <label htmlFor='position'>Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name='position'
          id='position'
        />
      </div>

      <div className='control'>
        <label htmlFor='equipment'>Equipment:</label>
        <select
          name='equipment'
          id='equipment'
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}>
          <option value=''>Select equipment:</option>
          {availableEquipment?.map((item) => (
            <option key={item._id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className='control'>
        <label htmlFor='favoriteBrand'>Favorite Brand:</label>
        <select
          name='favoriteBrand'
          id='favoriteBrand'
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value=''>Select a Brand:</option>
          {favoriteBrands?.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className='buttons'>
        <button type='submit' disabled={disabled}>
          {employee ? 'Update Employee' : 'Create Employee'}
        </button>

        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
