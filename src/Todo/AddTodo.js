import React, { useState } from 'react';
import PropTypes from 'prop-types';

function useInputValue(defaultValue = '') {
  //створюєм власний хук, як і всі хуки починаються з use...
  const [value, setValue] = useState(defaultValue);
  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value),
    },
    clear: () => setValue(''),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue(''); //* юзаєм власний хук useInputValue
  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  // function AddTodo({ onCreate }) {
  //   const [value, setValue] = useState(''); //* юзаєм стандартний хук useState
  //     event.preventDefault();

  //     if (value.trim()) {
  //       onCreate(value);
  //       setValue('');
  //     }
  //   }

  return (
    <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
      <input //* юзаєм на пару з власним хуком useInputValue
        type="text"
        {...input.bind}
      />

      {/* <input      //* юзаєм на пару з стандартним хуком useState
        type="text"
        value={value}
        onChange={event => setValue(event.target.value)}
      /> */}
      <button type="submit">Add todo</button>
    </form>
  );
}
AddTodo.propTypes = { onCreate: PropTypes.func.isRequired };

export default AddTodo;
