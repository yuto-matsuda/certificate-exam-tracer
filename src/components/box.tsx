export default function Box({
    color,
    children
}: {
    color: 'blue' | 'orange',
    children: React.ReactNode
}) {
  const style = color === 'blue'
          ? 'bg-blue-100 border-cyan-800'
          : 'bg-o-200';

  return (
      <div className={`p-2 mb-4 border-cy rounded-2xl border-2 ${style}`}>
          {children}
      </div>
  );
}