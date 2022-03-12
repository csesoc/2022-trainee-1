import {React, useState} from 'react'
import {FaTimes} from 'react-icons/fa'
import "./CategoryTags.css"


const InputStyle = {
  width: "75%", 
  maxWidth: "1000px", 
  margin: "auto", 
  borderTopStyle: "hidden", 
  borderRightStyle: "hidden", 
  borderLeftStyle: "hidden", 
  borderBottomStyle: "dashed", 
  borderColor: "black", 
  borderRadius: "2px", 
  background: "#f6faff"
}

const CategoryTags = ({ tags, setTags }) => {
  const [category, setCategory] = useState("")

  const handleEnter = (e) => {
    const val = e.target.value
    if (e.key === "Enter" && val && !tags.includes(val)) {
      setTags([...tags, val])
      setCategory("")
    }
  }

  const removeTag = (i) => {
    const newTags = [...tags]
    newTags.splice(i, 1)
    setTags(newTags) //remove tag at index 1 from state

  }

  

  return ([
    <input type="text" placeholder="Enter Category Tags" className="form-control" value={category} 
    onChange={(e) => setCategory(e.target.value)} 
    onKeyDown={handleEnter}
    style={InputStyle}/>,
    <div className="flex-container">
      {tags.map((tag, i) =>
        <div className="tag" key={tag}>
          {tag}
          <FaTimes className="x" onClick={() => removeTag(i)}/>
        </div>
      )}
    </div>
  ]);
}

export default CategoryTags