interface ToggleSwitchProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

export function ToggleSwitch({ checked, label, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`sw${checked ? ' on' : ''}`}
      onClick={onChange}
    />
  );
}
