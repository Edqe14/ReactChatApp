import BaseContainer from '../components/BaseContainer';
import Button from '../components/Button';
import Field from '../components/Field';
import { nanoid } from 'nanoid';
import { useAlert } from 'react-alert';
import { useCookies } from 'react-cookie';

export default function Home({ login }) {
  const [cookies, setCookie] = useCookies();
  const alert = useAlert();

  const newUser = (e) => {
    e.preventDefault();

    const username = e?.target?.username?.value;
    if (!username) return alert.error('Username must not be empty');

    const userID = nanoid(16);
    setCookie('userID', userID);

    const payload = {
      isNew: true,
      userID,
      username,
    };

    return login(payload);
  };

  return (
    <BaseContainer className='justify-center items-center'>
      {!cookies.userID && (
        <form onSubmit={newUser} className='w-96'>
          <Field name='username' title='Username' />

          <div className='flex items-center justify-end'>
            <Button text='Continue' type='submit' />
          </div>
        </form>
      )}
    </BaseContainer>
  );
}
