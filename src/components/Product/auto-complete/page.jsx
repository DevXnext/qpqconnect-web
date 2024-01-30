// AutocompleteInput.js
import React, { useState, useRef, useEffect } from 'react';

const AutocompleteInput = ({ label, suggestions, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = suggestions.filter((item) =>
    item.includes(value)
  );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSelect(suggestion);
  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      // Clicked outside the input, hide suggestions
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={inputRef} className="autocomplete flex flex-col space-y-2 w-full">
      <label className="font-semibold text-gray-700 ">{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
       placeholder={`Type a ${label.toLowerCase()}...`}
        className="bg-gray-50 h-12 border border-gray-300 rounded-md w-full px-3"
      />
      {showSuggestions && (
        <ul className="suggestions bg-gray-50 rounded-md w-full my-1">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer bg-gray-50 hover:bg-gray-200 rounded-md w-full px-3 py-1"
            >
              {suggestion}
            </li>
          ))}
          {inputValue.trim() !== '' && !filteredSuggestions.includes(inputValue) && (
            <li
              onClick={() => handleSuggestionClick(inputValue)}
              className="cursor-pointer bg-gray-50 hover:bg-gray-200 rounded-md w-full px-3 py-1"
            >
              Add `{inputValue}`
            </li>
          )}

        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
