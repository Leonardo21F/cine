"use client"

import Select, { StylesConfig, MultiValue } from "react-select"

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  value: string[]
  onChange: (values: string[]) => void
  className?: string
  placeholder?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  className,
  placeholder,
}: MultiSelectProps) {
  const handleChange = (selectedOptions: MultiValue<Option>) => {
    onChange([...selectedOptions.map((option) => option.value)])
  }

  const customStyles: StylesConfig<Option, true> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(55, 65, 81, 0.5)", // bg-gray-700 bg-opacity-50
      borderColor: "#4B5563", // border-gray-600
      borderRadius: "9999px", // rounded-full
      color: "#FFFFFF", // text-white
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(31, 41, 55, 0.9)", // bg-gray-800 bg-opacity-90
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#374151", // bg-gray-700
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#FFFFFF", // text-white
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF", // text-gray-400
    }),
    input: (provided) => ({
      ...provided,
      color: "#FFFFFF", // text-white
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#FFFFFF", // text-white
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#2563EB" : "rgba(31, 41, 55, 0.9)",
      color: "#FFFFFF",
    }),
  }

  return (
    <Select
      isMulti
      options={options}
      value={options.filter((option) => value.includes(option.value))}
      onChange={handleChange}
      className={className}
      styles={customStyles}
      placeholder={placeholder}
    />
  )
}
