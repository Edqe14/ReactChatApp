import { DateTime } from 'luxon';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';

export default function UserMessage({
  value,
  username,
  image,
  timestamp,
  self,
  messages,
  _id,
  index,
}) {
  const before = messages[index - 1];
  const pastTimestamp = before?.timestamp;
  const newLine = timestamp - pastTimestamp >= 60000;

  const trail =
    messages.filter((m) => m.type === 'user:message')[0]?.timestamp ===
    timestamp
      ? false
      : (!newLine || isNaN(newLine)) && before?.userID === _id;

  return (
    <div
      className={[
        self ? 'self-end' : 'self-start',
        'max-w-2/3 break-all',
        'flex',
        self && !trail && 'flex-row-reverse',
        trail ? 'mt-2' : 'mt-4',
        trail && !self ? 'ml-12' : trail && self ? 'mr-12' : '',
      ].join(' ')}
    >
      {!trail && (
        <img
          src={image}
          alt=''
          className={[
            'w-10 h-10 rounded-full',
            self && 'justify-self-end',
            self ? 'ml-2' : 'mr-2',
          ].join(' ')}
        />
      )}

      <div className='flex flex-col justify-center'>
        {!trail && (
          <h3
            className={[!self ? 'self-start' : 'self-end', 'font-medium'].join(
              ' '
            )}
          >
            {username}
          </h3>
        )}

        <div
          className={['flex self-end', self && 'flex-row-reverse'].join(' ')}
        >
          <Markdown
            remarkPlugins={[gfm]}
            className={[
              self ? 'bg-white text-primary' : 'bg-blue',
              'py-1 px-3 rounded-xl markdown',
              self && 'self',
            ].join(' ')}
          >
            {value}
          </Markdown>

          {(!trail || newLine) && (
            <span
              className={[
                'text-sm text-gray self-end',
                self ? 'mr-2' : 'ml-2',
              ].join(' ')}
            >
              {DateTime.fromMillis(timestamp).toFormat('D T')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
