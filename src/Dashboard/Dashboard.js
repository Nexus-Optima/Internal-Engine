import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card style={{ maxWidth: 345, margin: '10px' }} onClick={() => handleNavigate('/subscription-management')}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Subscription Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your subscriptions efficiently.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* Add more cards for other tools in a similar fashion */}
    </div>
  );
};

export default Dashboard;
