export default function Field({ name, title, ...rest }) {
  return (
    <div className='flex flex-col'>
      <label htmlFor={name} className='text-xl'>
        {title}
      </label>

      <input
        type='text'
        autoCorrect='off'
        {...rest}
        name={name}
        className={[
          'transition duration-300 ease-in-out',
          'bg-secondary py-2 px-4 outline-none rounded-b-xl shadow',
          'mb-2 border-b-2 border-transparent focus:border-danger',
          rest.className,
        ].join(' ')}
      />
    </div>
  );
}
