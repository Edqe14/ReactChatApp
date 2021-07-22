export default function User({ name, image, creator }) {
  return (
    <div className='flex text-2xl items-center mb-2'>
      <img
        src={image}
        alt=''
        className={[
          'h-9 rounded-full mr-2',
          creator && 'border-2 border-gold',
        ].join(' ')}
      />
      <h2>{name}</h2>
    </div>
  );
}
