import { useNavigate } from 'react-router-dom';

function FloatingButton() {
  const navigate = useNavigate();


  return (
    <button
      className="btn btn-primary position-fixed bottom-0 end-0 m-5 rounded-circle"
      style={{ width: '70px', height: '70px', fontSize: '24px' }}
      onClick={() => navigate('/movements')}
    >
      <span className='fw-bold fs-1' >+</span>
    </button>
  );
}

export default FloatingButton;