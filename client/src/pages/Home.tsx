import { useParams } from 'react-router-dom';
import Board from '../components/Board';

const Home: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return <Board />;
};

export default Home;
