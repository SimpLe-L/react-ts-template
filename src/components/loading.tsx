import { Spin } from 'antd';

const FullScreenLoading = () => {
  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center'>
      <Spin delay={1000} size="large" />
    </div>
  );
};

export default FullScreenLoading;

