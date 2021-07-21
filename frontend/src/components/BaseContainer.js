export default function BaseContainer(props) {
  return (
    <div
      {...props}
      className={[
        'flex overflow-hidden',
        'bg-primary',
        'min-w-screen min-h-screen',
        'text-light',
        props.className,
      ].join(' ')}
    />
  );
}
