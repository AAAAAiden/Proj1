import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="Oops!"
      subTitle="The page you're looking for doesn't exist."
      extra={<Button type="primary" onClick={() => navigate('/')}>Go Home</Button>}
    />
  );
};

export default NotFound;
