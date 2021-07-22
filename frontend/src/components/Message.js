import UserMessage from './UserMessage';

export default function Message({
  self,
  value,
  userID,
  users,
  type,
  timestamp,
  messages,
  index,
}) {
  const user = users[userID];
  const className = [
    'max-w-2/3 shadow-warning',
    'rounded-md text-center',
    'py-2 px-4 font-medium',
    'break-all',
  ];
  let message = '';
  switch (type) {
    case 'sys:join':
    case 'sys:leave': {
      className.push('bg-warning', 'self-center', 'mb-4 mt-4');
      message = `${user?.username} ${
        type === 'sys:join' ? 'joined' : 'left'
      } the room`;
      break;
    }

    case 'user:message': {
      return (
        <UserMessage
          {...user}
          self={self}
          value={value}
          timestamp={timestamp}
          messages={messages}
          index={index}
        />
      );
    }

    default:
      return null;
  }

  return <div className={className.join(' ')}>{message}</div>;
}
