const SelectOption = ({ label, value, options = [], onChange }) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
      >
        <option value="">-- Select status --</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
