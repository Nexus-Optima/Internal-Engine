import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress  } from '@mui/material';

const initialModels = [];

const ModelTestResults = () => {
    const [models, setModels] = useState(initialModels);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Example API call
            const response = await fetch('http://127.0.0.1:5000/get_model_details');
            const jsonData = await response.json();
            console.log(response)
            setModels(jsonData);
            console.log(models)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="model table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Model Name</TableCell>
                            <TableCell>Accuracy</TableCell>
                            <TableCell>Input Data</TableCell>
                            <TableCell>Hyperparameters</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {models.map((model, index) => (
                            <TableRow key={index}>
                                <TableCell>{model.ModelID}</TableCell>
                                <TableCell>{model.Accuracy}</TableCell>
                                <TableCell>{model.InputColumns}</TableCell>
                                <TableCell>{model.HyperParameters}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                onClick={fetchData}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
                style={{ marginTop: '20px' }}
            >
                {isLoading ? 'Loading...' : 'Fetch Data'}
            </Button>
        </div>
    );
};

export default ModelTestResults;
