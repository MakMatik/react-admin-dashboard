import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataIssues } from "../../data/mockData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import * as React from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [actions, setActions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [pageSize, setPageSize] = React.useState(5);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getIssue = async (id) => {
    const result = await axios.get("http://localhost:8080/api/getAll/" + id);
    // const data = await result.json();
    // console.log(result);
    setIssues(result.data);
    return result.data;
  };

  const onButtonClick = async (e, row) => {
    e.stopPropagation();
    //alert(row);
    try {
      const iss = await getIssue(row);
      console.log(issues);
      //console.log(tasks);
      alert(iss.description);
    } catch (error) {
      console.log(error);
    }
    //alert(issue);
    //do whatever you want with the row
  };

  /*   const getIssues = async () => {
      const response = await fetch("http://localhost:3000/api/getAll");
      const data = await response.json();
      console.log(data);
      setUsers(data);
    }; */

  useEffect(() => {
    const getIssues = async () => {
      await fetch("http://localhost:8080/api/issue")
        .then((response) => response.json())
        .then((json) => setIssues(json));
    };
    const getUsers = async () => {
      await fetch("http://localhost:8080/api/user")
        .then((response) => response.json())
        .then((json) => setUsers(json));
    };
    const getRoles = async () => {
      await fetch("http://localhost:8080/api/role")
        .then((response) => response.json())
        .then((json) => setRoles(json));
    };
    const getPriorities = async () => {
      await fetch("http://localhost:8080/api/priority")
        .then((response) => response.json())
        .then((json) => setPriorities(json));
    };
    const getDepartments = async () => {
      await fetch("http://localhost:8080/api/department")
        .then((response) => response.json())
        .then((json) => setDepartments(json));
    };
    const getProcesses = async () => {
      await fetch("http://localhost:8080/api/process")
        .then((response) => response.json())
        .then((json) => setProcesses(json));
    };
    const getStatuses = async () => {
      await fetch("http://localhost:8080/api/status")
        .then((response) => response.json())
        .then((json) => setStatuses(json));
    };
    const getApprovals = async () => {
      await fetch("http://localhost:8080/api/approval")
        .then((response) => response.json())
        .then((json) => setApprovals(json));
    };
    const getActions = async () => {
      await fetch("http://localhost:8080/api/action")
        .then((response) => response.json())
        .then((json) => setActions(json));
    };
    getIssues();
    getActions();
    getApprovals();
    getDepartments();
    getPriorities();
    getProcesses();
    getStatuses();
    getUsers();
    getRoles();
  }, []);

  const columnsName = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
  ];
  const columns = [
    //{ field: "_id", headerName: "ID" },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "action_required",
      headerName: "Action Required",
      flex: 1,
    },
    {
      field: "assignee",
      headerName: "Action Owner",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      valueGetter: (params) => {
        console.log({ params });
        let result = [];
        if (params.row.priority) {
          if (params.row.priority.name) {
            result.push(params.row.priority.name);
          }
        }
        return result.join(", ");
      },
    },
    {
      field: "approval",
      headerName: "Approval",
      flex: 1,
      valueGetter: (params) => {
        console.log({ params });
        let result = [];
        if (params.row.approval) {
          if (params.row.approval.name) {
            result.push(params.row.approval.name);
          }
        }
        return result.join(", ");
      },
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      valueGetter: (params) => {
        console.log({ params });
        let result = [];
        if (params.row.department) {
          if (params.row.department.name) {
            result.push(params.row.department.name);
          }
        }
        return result.join(", ");
      },
    },
    {
      field: "process",
      headerName: "Process",
      flex: 1,
      valueGetter: (params) => {
        console.log({ params });
        let result = [];
        if (params.row.process) {
          if (params.row.process.name) {
            result.push(params.row.process.name);
          }
        }
        return result.join(", ");
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      valueGetter: (params) => {
        //console.log({ params });
        let result = [];
        if (params.row.subtask) {
          for (let i = 1; i < params.row.subtask.length + 1; i++) {
            result.push("Task: " + i + params.row.subtask + "<br></br>");
          }
        } else {
          result = ["No Subtasks."];
        }
        return result.join(",<br></br> /r/n");
      },
    },
    {
      field: "date_raised",
      type: "date",
      headerName: "Date Raised",
      flex: 1,
    },
    {
      field: "date_due",
      type: "date",
      headerName: "Date Due",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row: { _id } }) => {
        return (
          <Button
            variant="outlined"
            color="secondary"
            href="/issue/task/add"
            onClick={(e) => {
              onButtonClick(e, _id);
            }}
          >
            Add Subtask
          </Button>
        );
      },
    },
    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  return (
    <Box m="20px">
      <Header title="Action Register" subtitle="Mange System" />
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <Button
          variant="outlined"
          href="issue/add"
          color="secondary"
          startIcon={<AddTaskIcon />}
        >
          Add Issue
        </Button>
        <Button variant="contained" color="secondary" startIcon={<EditIcon />}>
          Edit Selected
        </Button>
        <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />}>
          Delete Selected
        </Button>
      </Box>

      <Box
        m="50px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            // whiteSpace: "normal !important",
            // wordWrap: "break-word !important",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            whiteSpace: "normal !important",
            wordWrap: "break-word !important",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          // checkboxSelection
          rows={issues}
          columns={columns}
          getRowId={(row) => row.id}
          loading={!issues.length}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>
      <Box
        m="50px 0 0 0"
        height="50vh"
        width="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            // whiteSpace: "normal !important",
            // wordWrap: "break-word !important",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            whiteSpace: "normal !important",
            wordWrap: "break-word !important",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box m="20px">
          <Header title="Approvals" subtitle="Current Approvals" />
        </Box>
        <DataGrid
          // checkboxSelection
          rows={approvals}
          columns={columnsName}
          getRowId={(row) => row.id}
          loading={!approvals.length}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Box>
      <Box
        m="100px 0 0 0"
        height="50vh"
        width="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            whiteSpace: "normal !important",
            wordWrap: "break-word !important",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box m="20px">
          <Header title="Statuses" subtitle="Current Statuses" />
        </Box>
        <DataGrid
          rows={statuses}
          columns={columnsName}
          getRowId={(row) => row.id}
          loading={!statuses.length}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Box>
      <Box
        m="100px 0 0 0"
        height="50vh"
        width="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            whiteSpace: "normal !important",
            wordWrap: "break-word !important",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box m="20px">
          <Header title="Departments" subtitle="Current Departments" />
        </Box>
        <DataGrid
          rows={departments}
          columns={columnsName}
          getRowId={(row) => row.id}
          loading={!departments.length}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Box>
      <Box
        m="100px 0 0 0"
        height="50vh"
        width="50vh"
        sx={{
          //display: "flex",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            whiteSpace: "normal !important",
            wordWrap: "break-word !important",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box m="20px">
          <Header title="Roles" subtitle="Current Roles" />
        </Box>
        <DataGrid
          rows={roles}
          columns={columnsName}
          getRowId={(row) => row.id}
          loading={!roles.length}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Box>
    </Box>
  );
};

export default Admin;