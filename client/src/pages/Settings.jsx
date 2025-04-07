"use client"

import { useState } from "react"

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState("") // State to manage the selected value

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value) // Update state on change
  }

  return (
    <div>
      <h1>Settings</h1>
      <form>
        <div>
          <label htmlFor="options">Choose an option:</label>
          <select
            id="options"
            value={selectedOption} // Controlled component
            onChange={handleSelectChange} // Added to onChange handler
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        {/* ...existing code... */}
      </form>
    </div>
  )
}

export default Settings

