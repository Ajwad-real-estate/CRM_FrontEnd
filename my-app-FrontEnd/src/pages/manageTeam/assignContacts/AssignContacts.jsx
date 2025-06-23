import {
  Card,
  CardContent,
  Checkbox,
  Input,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../helpers/redux/theme";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
} from "@mui/material";
import clientsApi from "../../../api/clientsApis";
import { useAssignContacts } from "./useAssignContacts";

const AssignContacts = () => {
  const {
    clients,
    agents,
    loading,
    fetchUnassignedClients,
    fetchSalesAgents,
    assignClientsToAgents,
    setAgents,
  } = useAssignContacts();
  const [selectedClients, setSelectedClients] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchUnassignedClients();
    fetchSalesAgents();
  }, []);

  // Update agent quantities whenever selected clients change
  useEffect(() => {
    if (agents.length > 0) {
      const clientsPerAgent = Math.floor(
        selectedClients.length / agents.length
      );
      const remainder = selectedClients.length % agents.length;

      setAgents((prev) =>
        prev.map((agent, index) => ({
          ...agent,
          quantity: clientsPerAgent + (index < remainder ? 1 : 0),
        }))
      );
    }
  }, [selectedClients.length, agents, setAgents]);

  const handleClientToggle = (clientId) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleQuantityChange = (agentId, value) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? { ...agent, quantity: parseInt(value) || 0 }
          : agent
      )
    );
  };

  const handleAssign = async () => {
    if (selectedClients.length === 0) return;

    const totalQuantity = agents.reduce(
      (sum, agent) => sum + agent.quantity,
      0
    );
    if (totalQuantity > selectedClients.length) {
      alert(
        "Total assigned quantity cannot exceed the number of selected clients."
      );
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        agents: agents.map(({ id, quantity }) => ({ id, quantity })),
        clients: selectedClients,
      };
      const success = await assignClientsToAgents(payload);

      if (success) {
        setSelectedClients([]);
        setAgents((prev) => prev.map((agent) => ({ ...agent, quantity: 0 })));
        await fetchUnassignedClients();
      } else {
        console.error("Failed to assign clients");
      }
    } catch (error) {
      console.error("Error assigning clients:", error);
    }
    setSubmitting(false);
  };

  const handleSelectAllClients = () => {
    const allClientIds = clients.map((client) => client.id);
    setSelectedClients(allClientIds);
  };

  const columns = [
    {
      field: "checkbox",
      headerName: "",

      headerCheckboxSelection: false,
      headerCheckboxSelectionFilteredOnly: false,
      renderCell: (params) => (
        <Checkbox
          checked={selectedClients.includes(params.row.id)}
          onChange={() => handleClientToggle(params.row.id)}
        />
      ),
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone_numbers",
      headerName: "Phone Numbers",
      flex: 1,
      renderCell: (params) => {
        return params.value ? params.value.join(", ") : "-";
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardContent>
          <>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Box m="20px">
                    <h3 className="text-lg font-medium">
                      Select Clients ({selectedClients.length} selected)
                    </h3>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleSelectAllClients}
                        disabled={clients.length === selectedClients.length}>
                        Select All Clients
                      </Button>
                      <Box
                        m="40px 0 0 0"
                        // height="75vh"
                        sx={{
                          "& .MuiDataGrid-root": {
                            border: "none",
                            fontSize: isNonMobile ? "14px" : "8px",
                          },
                          "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                            cursor: "pointer",
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
                          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                          },
                        }}>
                        <DataGrid
                          // checkboxSelection
                          rows={clients}
                          columns={columns}
                          components={{ Toolbar: GridToolbar }}
                          loading={loading}
                          autoHeight
                          onSelectionModelChange={(newSelection) => {
                            setSelectedClients(newSelection.selectionModel);
                          }}
                        />

                        <div className="grid gap-4">
                          <h3 className="text-lg font-medium">
                            Assign to Agents
                          </h3>

                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Agent Name</TableCell>
                                  <TableCell>Quantity</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {agents.map((agent) => (
                                  <TableRow key={agent.id}>
                                    <TableCell>{agent.name}</TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        min="0"
                                        value={agent.quantity}
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            agent.id,
                                            e.target.value
                                          )
                                        }
                                        className="w-full"
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                              <TableFooter>
                                <TableRow>
                                  <TableCell colSpan={2}>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={handleAssign}
                                      disabled={
                                        submitting ||
                                        selectedClients.length === 0
                                      }
                                      className="w-full">
                                      {submitting
                                        ? "Assigning..."
                                        : "Assign Clients"}
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </TableFooter>
                            </Table>
                          </TableContainer>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
          </>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignContacts;
