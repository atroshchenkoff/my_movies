import { useHistory } from 'react-router';

const Main = () => {
  const history = useHistory()
  return (
    <div>
      {history.push('/searchresult/popular')}
    </div>
  );
};

export default Main;
