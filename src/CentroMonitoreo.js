import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button, Card, CardContent, Typography } from '@mui/material';
import config from './config';

const Toten = ({ id, videoUrl, controlUrl }) => {
  const handleControl = (device) => {
    axios.post(`${config.API_URL}/api/totens/${id}/control`, { device })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error controlando el dispositivo:", error);
      });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Tótem {id}</Typography>
        <iframe src={videoUrl} width="100%" height="300px" title={`Tótem ${id}`} />
        <Button onClick={() => handleControl('lock')}>Cerrar/Abrir Puerta</Button>
        <Button onClick={() => handleControl('siren')}>Activar/Desactivar Sirena</Button>
        <Button onClick={() => handleControl('light')}>Encender/Apagar Luces</Button>
        <Button onClick={() => handleControl('audio')}>Activar/Desactivar Audio</Button>
      </CardContent>
    </Card>
  );
};

const CentroMonitoreo = () => {
  const [totens, setTotens] = useState([]);

  useEffect(() => {
    axios.get(`${config.API_URL}/api/totens`)
      .then(response => {
        setTotens(response.data);
      })
      .catch(error => {
        console.error("Error obteniendo los tótems:", error);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {totens.map(toten => (
        <Grid item xs={12} md={6} key={toten.id}>
          <Toten id={toten.id} videoUrl={toten.videoUrl} controlUrl={toten.controlUrl} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CentroMonitoreo;
