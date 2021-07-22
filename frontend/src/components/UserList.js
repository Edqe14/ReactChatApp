import User from './User';

export default function UserList({ list, creator }) {
  return (
    <div className='bg-third p-6 flex-grow h-all overflow-y-auto hidden sm:block'>
      {list.map((u, i) => (
        <User
          key={i}
          name={u?.username}
          image={u?.image}
          creator={creator === u?._id}
        />
      ))}
    </div>
  );
}
