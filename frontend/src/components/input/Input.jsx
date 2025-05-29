import styles from "../input/input.module.css";

export function Input({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange
}) {
  return (
    <div className={styles.reset}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
