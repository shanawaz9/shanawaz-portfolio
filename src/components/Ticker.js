const ITEMS = [
  'Product designer',
  'User Research',
  'Visual design',
  'Product thinking',
  'Design systems',
  'Figma',
  'Design thinking',
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span className="ticker-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
