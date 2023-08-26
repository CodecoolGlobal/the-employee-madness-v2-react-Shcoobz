import { useState } from 'react';

const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  availableEquipment,
}) => {
  const [name, setName] = useState(employee?.name ?? '');
  const [level, setLevel] = useState(employee?.level ?? '');
  const [position, setPosition] = useState(employee?.position ?? '');
  const [selectedEquipment, setSelectedEquipment] = useState(
    employee?.equipment ?? ''
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipment: selectedEquipment,
      });
    }

    return onSave({
      name,
      level,
      position,
      equipment: selectedEquipment,
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
          <option></option>
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
