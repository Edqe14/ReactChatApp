export default function AlertTemplate({ message, options, style, close }) {
  return (
    <div
      style={style}
      className={[
        'max-w-72 rounded px-3 py-2',
        options.type === 'error' && 'bg-danger shadow-danger',
        options.type === 'info' && 'bg-warning shadow-warning',
        options.type === 'success' && 'bg-success shadow-success',
      ].join(' ')}
      onClick={close}
    >
      <span
        className={['font-medium flex flex-wrap break-all', 'text-light'].join(
          ' '
        )}
      >
        {message}
      </span>
    </div>
  );
}
