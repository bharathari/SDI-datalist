import * as React from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
// import AccordionIndicator from "./filter";
import {  Outlet } from "react-router-dom";
import ButtonAppBar from "./tabchild";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { Button, TabPanel } from "@mui/joy";
import GroupAppBar from "./group-header";
import GroupList from "./group-cards";
import TabsBasic from "./IncidentInfo";
import Geology from "./Geology-form";
import Sciences from "./sciences-form";
import Hydeology from "./Hydrology-form";
interface ListItem {
  key: string;
  value: string;
}
const org1="CoES"
const org2="Agency"
const org3="Geology"
const org4="Academy"
const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

const typeList: ListItem[] = [
  { key: "Type1", value: "KML" },
  { key: "Type2", value: "SHP",},
  { key: "Type3", value: "CSV" },
];

export default function BasicGrid() {

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const newSelectedValues = [...selectedValues];

    if (checked) {
      if (!newSelectedValues.includes(value)) {
        newSelectedValues.push(value);
      }
    } else {
      const index = newSelectedValues.indexOf(value);
      if (index > -1) {
        newSelectedValues.splice(index, 1);
      }
    }
    console.log(newSelectedValues);

    setSelectedValues(newSelectedValues);
  };

  
  return (
    <>
    
      <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'secondary',"--Tabs-spacing": "0px"}}>
        <TabList
          disableUnderline
          sx={{
            p: 0.2,
            gap: 2,
            bgcolor: '#71ab8d',
            color:'white',
            [`& .${tabClasses.root}`]: { // Apply to all tabs
              borderRadius: '0.5em',
              color: 'black',
            },
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              borderRadius:'0.5em',
              bgcolor: 'background.surface',
              color:'black'
            },
          }}
        >
          <Tab disableIndicator sx={{fontWeight:500}}> <Button variant="plain" sx={{backgroundColor:'neutral',color:'black'}}> My Content</Button></Tab>
          <Tab disableIndicator sx={{fontWeight:500}}><Button variant="plain"  sx={{backgroundColor:'neutral',color:'black'}}>Groups</Button></Tab>
          <Tab disableIndicator sx={{fontWeight:500}}><Button variant="plain"  sx={{backgroundColor:'neutral',color:'black'}}>Organisation</Button></Tab>
          <Tab disableIndicator sx={{fontWeight:500}}><Button variant="plain"  sx={{backgroundColor:'neutral',color:'black'}}>Public</Button></Tab>
          <Tab disableIndicator sx={{fontWeight:500}}><Button variant="plain"  sx={{backgroundColor:'neutral',color:'black'}}>Forms</Button></Tab>

        </TabList>
    <TabPanel value={0} sx={{padding:'none',margin:'none'}}>
      <ButtonAppBar />
      <Grid container spacing={0.3} sx={{ flexGrow: 1, height: "100%" }}>
        <Grid xs={2}>
          <Item variant="plain">
            <Box sx={{ width: "100%", backgroundColor: "none" }}>
              <Stack spacing={2}>
                <Item sx={{ textAlign: "center" }}>Filters</Item>
                <Grid sx={{ ml: "0" }}><b>Filter By type</b></Grid>
                {typeList.map((item) => (
                  <Grid key={item.key} sx={{ ml: 2 }}>
                      <FormControlLabel
                      control={
                        <Checkbox
                        size="small"
                          checked={selectedValues.includes(item.value)}
                          onChange={handleChange}
                          value={item.value}
                          sx={{padding:'0.3em',pl:'1.5em'}}
                        />
                      }
                      label={item.value}
                    />
                  </Grid>
                ))}
              </Stack>
            </Box>
          </Item>
        </Grid>
        <Grid xs={10}>
          <Item>
            <Outlet />
          </Item>
        </Grid>
      </Grid>
      </TabPanel>
      <TabPanel value={1} sx={{padding:'none',margin:'none'}}>
      <GroupAppBar />
      <Grid container spacing={0.3} sx={{ flexGrow: 1, height: "100%" }}>
        <Grid xs={2}>
          <Item variant="plain">
            <Box sx={{ width: "100%", backgroundColor: "none" }}>
              <Stack spacing={2}>
                <Item sx={{ textAlign: "center" }}>Filters</Item>
                <Grid sx={{ ml: "0" }}><b>Filter By type</b></Grid>
                {typeList.map((item) => (
                  <Grid key={item.key} sx={{ ml: 2 }}>
                      <FormControlLabel
                      control={
                        <Checkbox
                        size="small"
                          checked={selectedValues.includes(item.value)}
                          onChange={handleChange}
                          value={item.value}
                          sx={{padding:'0.3em',pl:'1.5em'}}
                        />
                      }
                      label={item.value}
                    />
                  </Grid>
                ))}
              </Stack>
            </Box>
          </Item>
        </Grid>
        <Grid xs={10}>
          <Item>
            <GroupList/>
          </Item>
        </Grid>
      </Grid>
      </TabPanel>
      <TabPanel value={2}>
        <b>Third</b> tab panel
      </TabPanel>
      <TabPanel value={3}>
        <b>Third</b> tab panel
      </TabPanel>

      <TabPanel value={4} sx={{backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'center'}}>
        {org1==="CoES" &&(
        <TabsBasic/>
      )}
      {/* {org2==="Agency"&&(
        <Hydeology/>
      )} */}
      {/* {org3==="Geology"&&(
        <Geology/>
      )} */}
      {/* {org4==="Academy"&&(
        <Sciences/>
      )} */}
      </TabPanel>
      </Tabs>
    </>
  );
}
