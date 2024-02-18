import React, { useState } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, Button, TextField, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// Initial state for a new commodity entry
const initialCommodity = { name: '', endDate: '' };
// Example commodity options for the dropdown
const commodityOptions = ["cotton", "wheat", "corn"];

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [modules, setModules] = useState([]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const addModule = () => {
    setModules([...modules, {
      moduleName: '',
      endDate: '',
      commodities: [initialCommodity],
    }]);
  };

  const handleModuleChange = (moduleIndex, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].moduleName = value;
    if (value !== 'forecasting') {
      delete updatedModules[moduleIndex].commodities;
    } else if (!updatedModules[moduleIndex].commodities) {
      updatedModules[moduleIndex].commodities = [initialCommodity];
    }
    setModules(updatedModules);
  };

  const handleEndDateChange = (moduleIndex, value, commodityIndex = null) => {
    const updatedModules = [...modules];
    if (commodityIndex !== null) {
      updatedModules[moduleIndex].commodities[commodityIndex].endDate = value;
    } else {
      updatedModules[moduleIndex].endDate = value;
    }
    setModules(updatedModules);
  };

  const handleCommodityNameChange = (moduleIndex, commodityIndex, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].commodities[commodityIndex].name = value;
    setModules(updatedModules);
  };

  const addCommodity = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].commodities.push({ ...initialCommodity });
    setModules(updatedModules);
  };

  const removeCommodity = (moduleIndex, commodityIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].commodities.splice(commodityIndex, 1);
    setModules(updatedModules);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Transform the modules array to the desired nested object structure
    const modulesData = modules.reduce((acc, module) => {
        if (module.moduleName === 'forecasting') {
            acc[module.moduleName] = { commodities: {} };
            module.commodities.forEach(commodity => {
                if (commodity.name) {
                    acc[module.moduleName].commodities[commodity.name] = { endDate: commodity.endDate };
                }
            });
        } else {
            acc[module.moduleName] = { endDate: module.endDate };
        }
        return acc;
    }, {});

    const requestData = {
        email,
        modules: modulesData
    };

    console.log("Sending requestData:", requestData);

    // Replace '<port>' with your backend server's port number
    const apiUrl = '${process.env.REACT_APP_BACKEND_URL_POST}';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);

        // Handle success response (e.g., displaying a success message or redirecting)
    } catch (error) {
        console.error('Error:', error);

        // Handle errors (e.g., displaying an error message)
    }
};


  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {modules.map((module, moduleIndex) => (
          <Box key={moduleIndex} marginY={2}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Module</InputLabel>
              <Select
                value={module.moduleName}
                onChange={(e) => handleModuleChange(moduleIndex, e.target.value)}
                required
              >
                <MenuItem value="forecasting">Forecasting</MenuItem>
                <MenuItem value="inventory_management">Inventory Management</MenuItem>
                <MenuItem value="optimiser">Optimiser</MenuItem>
              </Select>
            </FormControl>
            {module.moduleName === 'forecasting' ? (
              module.commodities.map((commodity, commodityIndex) => (
                <Box key={commodityIndex} display="flex" alignItems="center">
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Commodity</InputLabel>
                    <Select
                      value={commodity.name}
                      onChange={(e) => handleCommodityNameChange(moduleIndex, commodityIndex, e.target.value)}
                      required
                    >
                      {commodityOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="End Date"
                    type="date"
                    value={commodity.endDate}
                    onChange={(e) => handleEndDateChange(moduleIndex, e.target.value, commodityIndex)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                  <Button onClick={() => removeCommodity(moduleIndex, commodityIndex)}><RemoveCircleOutlineIcon /></Button>
                  {commodityIndex === module.commodities.length - 1 && (
                    <Button onClick={() => addCommodity(moduleIndex)}><AddCircleOutlineIcon /></Button>
                  )}
                </Box>
              ))
            ) : (
              <TextField
                label="End Date"
                type="date"
                value={module.endDate}
                onChange={(e) => handleEndDateChange(moduleIndex, e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            )}
          </Box>
        ))}
        <Button onClick={addModule} startIcon={<AddCircleOutlineIcon />}>
          Add Module
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default SubscriptionForm;
