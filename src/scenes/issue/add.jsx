import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useState, useEffect } from "react";
import axios from "axios";

const Add = () => {
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [priority, setPriorities] = useState([]);
  const [department, setDepartment] = useState([]);
  const [process, setProcess] = useState([]);
  const [inputs, setInputs] = useState({
    approval: "",
    description: "",
    action_required: "",
    assignee: "",
    priority: "",
    department: "",
    process: "",
    status: "",
    date_raised: "",
    date_due: "",
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const navigate = useNavigate();
  // const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const addIssue = async (inputs, onSubmitProps) => {
    const result = await axios.post("http://localhost:3000/api/post", inputs);
    console.log(result.data.data);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    addIssue(values, onSubmitProps);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIssue(inputs, e.onSubmitProps);
    navigate("/issue");
    console.log(inputs);
  };

  useEffect(() => {
    const getIssues = async () => {
      await fetch("http://localhost:3000/api/getAll")
        .then((response) => response.json())
        .then((json) => setIssues(json));
    };
    getIssues();
  }, []);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box m="20px">
      <Header title="ADD ISSUE" subtitle="Add an Issue" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesIssue}
        validationSchema={issueSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          // handleChange,
          //handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* <InputLabel id="demo-simple-select-standard-label">
                Approval
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={initialValuesIssue.Approval}
                onChange={handleChange}
                label="Approval"
              >
                <MenuItem value={"To Approve"}>To Approve</MenuItem>
                <MenuItem value={"Approved"}>Approved</MenuItem>
              </Select> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Approval"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.approval}
                // defaultValue={initialValuesIssue.approval}
                name="approval"
                // error={!!touched.approval && !!errors.approval}
                // helperText={touched.approval && errors.approval}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.description}
                name="description"
                // error={!!touched.description && !!errors.description}
                // helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Assigned To"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.assignee}
                name="assignee"
                // error={!!touched.assignee && !!errors.assignee}
                // helperText={touched.assignee && errors.assignee}
                sx={{ gridColumn: "span 2" }}
              >
                {issues.map((params) => (
                  <MenuItem key={params._id} value={params.assignee}>
                    {params.assignee}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Action Required"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.action_required}
                name="action_required"
                // error={!!touched.action_required && !!errors.action_required}
                // helperText={touched.action_required && errors.action_required}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Priority"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.priority}
                name="priority"
                // error={!!touched.priority && !!errors.priority}
                // helperText={touched.priority && errors.priority}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.department}
                name="department"
                // error={!!touched.department && !!errors.department}
                // helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="process"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.process}
                name="process"
                // error={!!touched.process && !!errors.process}
                // helperText={touched.process && errors.process}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.status}
                name="status"
                // error={!!touched.status && !!errors.status}
                // helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date Raised"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.date_raised}
                name="date_raised"
                // error={!!touched.date_raised && !!errors.date_raised}
                // helperText={touched.date_raised && errors.date_raised}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date Due"
                onBlur={handleBlur}
                onChange={handleChange}
                value={inputs.date_due}
                name="date_due"
                // error={!!touched.date_due && !!errors.date_due}
                // helperText={touched.date_due && errors.date_due}
                sx={{ gridColumn: "span 2" }}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <MobileDatePicker
                    label="Date mobile"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <TimePicker
                    label="Time"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DateTimePicker
                    label="Date&Time picker"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add Issue
              </Button>
              <Typography
                onClick={() => {
                  // setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              ></Typography>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const issueSchema = yup.object().shape({
  Approval: yup.string().required("required"),
  description: yup.string().required("required"),
  action_required: yup.string().required("required"),
  assignee: yup.string().required("required"),
  priority: yup.string().required("required"),
  department: yup.string().required("required"),
  process: yup.string().required("required"),
  status: yup.string().required("required"),
  date_raised: yup.string().required("required"),
  date_due: yup.string().required("required"),
});

const initialValuesIssue = {
  approval: "",
  description: "",
  action_required: "",
  assignee: "",
  priority: "",
  department: "",
  process: "",
  status: "",
  date_raised: "",
  date_due: "",
};

export default Add;
