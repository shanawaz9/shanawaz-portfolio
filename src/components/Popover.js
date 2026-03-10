export default function Popover({ open, text, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="t-popover-backdrop open" onClick={onClose} />
      <div className="t-popover open">
        <button className="t-popover-close" onClick={onClose}>&times;</button>
        <div className="t-popover-content">
          <p className="t-popover-text">{text}</p>
        </div>
      </div>
    </>
  );
}
