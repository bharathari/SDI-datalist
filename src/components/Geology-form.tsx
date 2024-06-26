import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
  styled,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface GeologyFormInputs {
  hazardZone: {
    locationLatitude: number | null;
    locationLongitude: number | null;
    dateOfIdentification: string;
    riskAssessment: string;
    mitigationMeasures: string;
  };
}

const geoDefaultValues: GeologyFormInputs = {
  hazardZone: {
    locationLatitude: null,
    locationLongitude: null,
    dateOfIdentification: "",
    riskAssessment: "",
    mitigationMeasures: "",
  },
};

// Define validation schema using Yup
const validationSchema: Yup.ObjectSchema<GeologyFormInputs> =
  Yup.object().shape({
    hazardZone: Yup.object().shape({
      locationLatitude: Yup.number()
        .nullable()
        .required("Latitude is required"),
      locationLongitude: Yup.number()
        .nullable()
        .required("Longitude is required"),
      dateOfIdentification: Yup.string().required(
        "Date of Identification is required"
      ),
      riskAssessment: Yup.string().required("Risk Assessment is required"),
      mitigationMeasures: Yup.string().required(
        "Mitigation Measures are required"
      ),
    }),
  });

export default function Geology() {
  const [horizontalValue, setHorizontalValue] = React.useState<number>(0);
  const [submit, updateSubmit] = React.useState(true);
  const locationLatitudeRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (locationLatitudeRef.current) {
      locationLatitudeRef.current.focus();
    }
  }, []);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GeologyFormInputs>({
    defaultValues: geoDefaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: GeologyFormInputs) => {
    console.log(data);
    updateSubmit(true);
  };

  const CustomTabs = styled(Tab)({
    fontWeight: "bold",
    "&.Mui-selected": {
      color: "#458844ba",
    },
  });

  const CustomTab = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    "& .MuiFormLabel-root": {
      marginRight: theme.spacing(2),
      minWidth: "150px",
    },
    "& .MuiInput-root": {
      flexGrow: 1,
    },
  }));

  return (
    <>
      <Box sx={{ width: "55%" }}>
        <Typography sx={{ fontWeight: "700", mb: "1.5%", ml: "38%", mt: "2%" }}>
          Main Department Of Geology
        </Typography>
        <Tabs
          aria-label="Basic tabs"
          value={horizontalValue}
          sx={{ backgroundColor: "white" }}
          onChange={(event, newValue) => {
            if (typeof newValue === "number") {
              setHorizontalValue(newValue);
            }
          }}
        >
          <TabList
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <CustomTabs disableIndicator color="success" variant="plain">
              Hazard Zone
            </CustomTabs>
          </TabList>
          <TabPanel
            value={0}
            sx={{
              backgroundColor: "white",
              width: "60%",
              alignSelf: "center",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <CustomTab>
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <Box display={'flex'}>
                  <Box sx={{ display: "flex",flexDirection:'column' }}>
                    <Input
                      sx={{ mr: 4 }}
                      placeholder="Latitude"
                      {...register("hazardZone.locationLatitude")}
                      onChange={(e)=>
                        {
                          e.preventDefault();
                        }
                      }
                      
                    />
                    {errors.hazardZone?.locationLatitude && (
                     <Box sx={{ display: "flex",mt:'0.1em',mb:'1em'}}>
                     <ErrorOutlineOutlined
                       sx={{ marginRight: "0.2em", fontSize: "1em" }}
                     />
                     <Typography color="error" sx={{ fontSize: "0.8em" }}>
                       {errors.hazardZone.locationLatitude.message}
                     </Typography>
                   </Box>
                 )}
                    
                    
                  </Box>

                      <Box sx={{ display: "flex",flexDirection:'column' }}>
                      <Input
                      placeholder="Longitude"
                      {...register("hazardZone.locationLongitude")}
                      onChange={(e)=>
                        {
                          e.preventDefault();
                        }
                      }
                    />
                    {errors.hazardZone?.locationLongitude && (
                      <Box sx={{ display: "flex",mt:'0.1em',mb:'1em'}}>
                      <ErrorOutlineOutlined
                        sx={{ marginRight: "0.2em", fontSize: "1em" }}
                      />
                      <Typography color="error" sx={{ fontSize: "0.8em" }}>
                        {errors.hazardZone.locationLongitude.message}
                      </Typography>
                    </Box>
                  )}
                      </Box>
                   
                    </Box>
                  
                </CustomTab>
                {/* <CustomTab>
                <FormLabel htmlFor="custom-type-of-Hazard">
                  Type Of Hazard
                </FormLabel>
                <Select
                  placeholder="Type of Hazard"
                  {...register('hazardZone.typeOfHazard')}
                  required
                >
                  <Option value="Hazard1">Hazard1</Option>
                  <Option value="Hazard2">Hazard2</Option>
                  <Option value="Hazard3">Hazard3</Option>
                  <Option value="Hazard4">Hazard4</Option>
                </Select>
              </CustomTab> */}
                <CustomTab>
                  <FormLabel htmlFor="custom-date-of-identification">
                    Date Of Identification
                  </FormLabel>
                  <Input
                    type="date"
                    {...register("hazardZone.dateOfIdentification")}
                    onChange={(e)=>
                      {
                        e.preventDefault();
                      }
                    }
                  />
                </CustomTab>
                {errors.hazardZone?.dateOfIdentification && (
                  <Box sx={{ display: "flex",ml:'10em',mt:'0.1em',mb:'1em'}}>
                  <ErrorOutlineOutlined
                    sx={{ marginRight: "0.2em", fontSize: "1em" }}
                  />
                  <Typography color="error" sx={{ fontSize: "0.8em" }}>
                    {errors.hazardZone.dateOfIdentification.message}
                  </Typography>
                </Box>
              )}
                <CustomTab>
                  <FormLabel htmlFor="custom-risk-assessment">
                    Risk Assessment
                  </FormLabel>
                  <Input
                    placeholder="Type in here…"
                    {...register("hazardZone.riskAssessment")}
                    onChange={(e)=>
                      {
                        e.preventDefault();
                      }
                    }
                  />
                </CustomTab>
                {errors.hazardZone?.riskAssessment && (
                   <Box sx={{ display: "flex",ml:'10em',mt:'0.1em',mb:'1em'}}>
                   <ErrorOutlineOutlined
                     sx={{ marginRight: "0.2em", fontSize: "1em" }}
                   />
                   <Typography color="error" sx={{ fontSize: "0.8em" }}>
                     {errors.hazardZone.riskAssessment.message}
                   </Typography>
                 </Box>
               )}
                <CustomTab>
                  <FormLabel htmlFor="custom-mitigation-measures">
                    Mitigation Measures
                  </FormLabel>
                  <Input
                    placeholder="Type in here…"
                    {...register("hazardZone.mitigationMeasures")}
                    onChange={(e)=>
                      {
                        e.preventDefault();
                      }
                    }
                  />
                </CustomTab>
                {errors.hazardZone?.mitigationMeasures && (
                  <Box sx={{ display: "flex",ml:'10em',mt:'0.1em',mb:'1em'}}>
                    <ErrorOutlineOutlined
                      sx={{ marginRight: "0.2em", fontSize: "1em" }}
                    />
                    <Typography color="error" sx={{ fontSize: "0.8em" }}>
                      {errors.hazardZone.mitigationMeasures.message}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {submit && (
                    <Button variant="solid" color="success" type="submit">
                      Submit
                    </Button>
                  )}
                </Box>
              </Stack>
            </form>
          </TabPanel>
        </Tabs>
      </Box>
    </>
  );
}
