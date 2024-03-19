const FileInput = ({
  label,
  onChange,
  error = null,
  cols = 6,
  isSmall = false,
  accept = "",
  multiple = false,
}) => {
  return (
    <div className={`col-md-${cols}`}>
      <div className="form-group">
        {label && <label className="form-label">{label}</label>}
        <div className="form-control-wrap">
          <input
            type="file"
            className={`form-control ${isSmall ? "form-control-sm" : ""}`}
            onChange={onChange}
            accept={accept}
            multiple={multiple}
          />
          <small className="text-danger">{error ? error[0] : ""}</small>
        </div>
      </div>
    </div>
  );
};

export default FileInput;
