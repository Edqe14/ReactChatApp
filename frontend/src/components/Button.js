export default function Button({ text, disableDefault, ...rest }) {
  return (
    <button
      {...rest}
      className={[
        ...(!disableDefault
          ? [
              'transition duration-300 ease-in-out',
              'border-2 border-danger px-6 py-2',
              'rounded-full mt-4',
              'hover:bg-danger hover:shadow-danger',
            ]
          : []),
        rest.className,
      ].join(' ')}
    >
      {text}
    </button>
  );
}
