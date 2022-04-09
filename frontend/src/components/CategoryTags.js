import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import "./CategoryTags.css"

const filter = createFilterOptions();


const CategoryTags = ({ tag, setTag, globalTags, setGlobalTags }) => {
  

  return (
    <Autocomplete
      value={tag}
      onChange={(event, newTag) => {
        if (typeof newTag === 'string') {
          setTag({
            tag: newTag,
          });
        } else if (newTag && newTag.inputValue) {
          // Create a new value from the user input
          setTag({
            tag: newTag.inputValue,
          });
          setGlobalTags({tag: newTag.inputValue})
        } else {
          setTag(newTag);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.tag);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            tag: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={globalTags}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.tag;
      }}
      renderOption={(props, option) => <li {...props}>{option.tag}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Select a tag" />
      )}
    />
  );

  // const [category, setCategory] = useState("")

  // const handleEnter = (e) => {
  //   const val = e.target.value
  //   if (e.key === "Enter" && val && !tags.includes(val)) {
  //     setTags([...tags, val])
  //     setCategory("")
  //   }
  // }

  // const removeTag = (i) => {
  //   const newTags = [...tags]
  //   newTags.splice(i, 1)
  //   setTags(newTags) //remove tag at index 1 from state

  // }

  

  // return ([
  //   <input type="text" placeholder="Enter Category Tags" className="form-control" value={category} 
  //   onChange={(e) => setCategory(e.target.value)} 
  //   onKeyDown={handleEnter}
  //   style={InputStyle}/>,
  //   <div className="flex-container">
  //     {tags.map((tag, i) =>
  //       <div className="tag" key={tag}>
  //         {tag}
  //         <FaTimes className="x" onClick={() => removeTag(i)}/>
  //       </div>
  //     )}
  //   </div>
  // ]);
}

export default CategoryTags