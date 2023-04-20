import React, {useState, useEffect} from 'react'

export function useDatePickerProps() {
  const [startDate, setStartDate,] = useState(null);
  const [endDate, setEndDate,] = useState(null);
  const [focusedInput, setFocsedInput,] = useState(null);

  

  return [startDate, setStartDate, endDate, setEndDate, focusedInput, setFocsedInput]
}


