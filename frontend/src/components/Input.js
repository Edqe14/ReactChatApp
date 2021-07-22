export default function Input(props) {
  return (
    <div
      {...props}
      contentEditable
      className={[
        'rounded-lg py-2 px-4 bg-secondary outline-none',
        'min-h-min max-h-24 w-full',
        'overflow-y-auto z-10',
        props.className,
      ].join(' ')}
    />
  );
}
