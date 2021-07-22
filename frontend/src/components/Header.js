import Button from './Button';
import { Link } from 'react-router-dom';

export default function Header({ name }) {
  return (
    <div className='p-6 bg-secondary flex justify-between items-center h-20'>
      <h2 className='text-4xl'>{name}</h2>

      <Link to='/room/landing' className='flex items-center text-lg'>
        <Button
          text='Leave'
          disableDefault
          className={[
            'transition duration-300 ease-in-out',
            'border-2 border-danger rounded-md px-4 py-1',
            'hover:bg-danger hover:shadow-danger',
          ].join(' ')}
        />
      </Link>
    </div>
  );
}
