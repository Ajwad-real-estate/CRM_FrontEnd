import { useEffect, useState } from "react";
import PipelineColumn from "./PipelineColumn";
import LeadCard from "./LeadCard";
import LeadModal from "./LeadModal";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { useLocation } from "react-router-dom";
import Action from "./actions/Action";
import { LeadOptionsProvider } from "./actions/LeadContext";
import ProgressCircle from "../ProgressCircle";
import { useQueryClient } from "@tanstack/react-query";
import useClients from "./useMainKanbanData";

// function transformData(clients) {
//   const columns = {};
//   const leads = {};

//   clients.forEach((client) => {
//     if (!columns[client.status]) {
//       columns[client.status] = {
//         id: client.status,
//         title: client.status ? client.status.charAt(0).toUpperCase() + client.status.slice(1) : "Unknown Status",
//         leadIds: [],
//       };
//     }

//     leads[client.id] = {
//       id: client.id,
//       title: client.name || "Untitled Lead",
//       amount: client.budget || "No Value",
//       company: client.city_id || "",
//       phoneNumber: client.phone_numbers[0] || "",
//       email: client.email || "",
//       // tags: [client.channel || ""],
//     };

//     columns[client.status].leadIds.push(client.id);
//   });

//   const columnOrder = ["new", "qualified", "reserved"
//     // , "done_deal"
//   ];
//   const orderedColumns = {};

//   columnOrder.forEach((status) => {
//     if (columns[status]) {
//       orderedColumns[status] = columns[status];
//     }
//   });

//   return { columns: orderedColumns, leads };
// }
function transformData(clients) {
  const columns = {};
  const leads = {};

  // Map status IDs to readable names
  const statusMap = {
    1: "new",
    2: "qualified",
    3: "reserved",
  };

  clients.forEach((client) => {
    const statusKey = statusMap[client.status_id] || "unknown";

    if (!columns[statusKey]) {
      columns[statusKey] = {
        id: statusKey,
        title: statusKey.charAt(0).toUpperCase() + statusKey.slice(1),
        leadIds: [],
      };
    }

    leads[client.id] = {
      id: client.id,
      title: client.name || "Untitled Lead",
      amount: client.budget ? `$${client.budget}` : "No Value",
      company: client.city_id ? `City ID: ${client.city_id}` : "Unknown City",
      phoneNumber:
        client.phone_numbers && client.phone_numbers[0]
          ? client.phone_numbers[0]
          : "No Phone",
      email: client.email || "No Email",
      statusID: client.status_id,
    };

    columns[statusKey].leadIds.push(client.id);
  });

  const columnOrder = ["new", "qualified", "reserved"];
  const orderedColumns = {};

  columnOrder.forEach((status) => {
    if (columns[status]) {
      orderedColumns[status] = columns[status];
    }
  });

  return { columns: orderedColumns, leads };
}

const KanbanBoard = () => {
  const [clients, setClients] = useState([]);
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const queryClient = useQueryClient();
  let currentSublink = location.pathname;
  if (currentSublink.includes("/NewNewKanbanBoard/")) {
    currentSublink = currentSublink.replace("/NewNewKanbanBoard/", "");
    queryClient.invalidateQueries({ queryKey: ["clientsList"] });
  }
  if (currentSublink.includes("/NewNewKanbanBoard")) {
    currentSublink = currentSublink.replace("/NewNewKanbanBoard", "");
    queryClient.invalidateQueries({ queryKey: ["clientsList"] });
  }
  console.log(currentSublink);
  // const { response, error, isLoading, isError, refetch } = useFetchClients();
  // console.log(response)
  const { data: io, isPending } = useClients(currentSublink);
  useEffect(
    function () {
      setClients(io);
      console.log(io);
    },
    [currentSublink, io]
  );
  // useEffect(() => {
  //   const fetchClients = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/api/clients?status=${currentSublink}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${Cookies.get("accessToken")}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.statusText}`);
  //       }

  //       const dataFromApi = await response.json();
  //       setClients(dataFromApi);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchClients();
  // }, [currentSublink]);

  const [data, setData] = useState({ columns: {}, leads: {} });
  console.log("data");
  console.log(data);
  // console.log("data columns");
  // console.log(data.columns);
  // Object.values(data.columns).forEach((column) => {
  //   if (!column.title || column.title.trim() === "") {
  //     column.title = {currentSublink};
  //   }
  //   data.columns[column.id] = column;
  //   console.log(column.title);
  // });
  useEffect(() => {
    if (clients?.length > 0) {
      const initialData = transformData(clients);
      setData(initialData);
    }
  }, [clients, io]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListView, setIsListView] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (data === null) {
    return (
      <Box textAlign="center" mt="50px">
        <Box
          sx={{
            height: "75vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProgressCircle size="80" rotate />
        </Box>
        <Typography variant="h4" color={colors.primary[100]}>
          Loading data...
        </Typography>
      </Box>
    );
  }

  const handleDoubleClick = (lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedLead(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const colors = tokens(theme.palette.mode);

  // const filteredLeads = Object.values(data.leads).filter(
  //   (lead) =>
  //     lead.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     lead.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     lead.tags.some((tag) =>
  //       tag.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  // );
  const updateLead = (updatedLead) => {
    setData((prevData) => {
      const { id } = updatedLead;

      if (!prevData.leads[id]) {
        console.error(`Lead with id ${id} not found.`);
        return prevData;
      }

      const updatedLeads = {
        ...prevData.leads,
        [id]: {
          ...prevData.leads[id],
          ...updatedLead,
        },
      };

      return {
        ...prevData,
        leads: updatedLeads,
      };
    });
  };

  const matchesSearch = (value, query) => {
    if (!value) return false;
    return value.toString().toLowerCase().includes(query.toLowerCase());
  };

  // Modified filtering logic
  const getFilteredLeads = () => {
    if (!data.leads) return [];

    return Object.values(data.leads).filter((lead) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true; // Show all leads if search is empty

      return (
        matchesSearch(lead.title, query) ||
        matchesSearch(lead.company, query) ||
        matchesSearch(lead.phoneNumber, query) ||
        matchesSearch(lead.email, query) ||
        matchesSearch(lead.amount, query)
      );
    });
  };

  // Get filtered leads for rendering
  const filteredLeads = getFilteredLeads();

  // Update the search handler to be more responsive
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          fontSize: isNonMobile ? "14px" : "8px",
          backgroundColor: colors.primary[400],
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            justifyContent: "space-between",
          }}
        >
          <TextField
            variant="outlined"
            label="Search Leads"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name, company, phone, email..."
            fullWidth
            sx={{ mr: 2, padding: "10px 0px", width: "50%", display: "flex" }}
          />
          <Button
            variant="contained"
            onClick={() => setIsListView(!isListView)}
            sx={{
              ml: 2,
              padding: "10px 0px",
              width: "25%",
              display: "flex",
              background: colors.columns[900],
              border: "0.01px solid ",
              borderColor: colors.columns[100],
              color: colors.grey[100],
              pl: 0.5,
              pr: 0.5,
              boxShadow: 3,
              "&:hover": {
                background: colors.columns[900],
                boxShadow: 9,
              },
            }}
          >
            {isListView ? "Switch to Kanban View" : "Switch to List View"}
          </Button>
        </Box>

        {isListView ? (
          <Box>
            {filteredLeads.map((lead) => (
              <Box key={lead.id} sx={{ mb: 2 }}>
                <LeadCard
                  lead={lead}
                  onDoubleClick={() => handleDoubleClick(lead)}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <div style={{ display: "flex", overflowX: "auto" }}>
            {Object.values(data.columns).map((column) => (
              <div
                key={column.id}
                style={{
                  margin: "0 8px",
                  minWidth: 250,
                  borderRadius: "8px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                }}
              >
                <PipelineColumn title={column.title}>
                  {filteredLeads
                    .filter((lead) =>
                      column.leadIds.includes(lead.id.toString())
                    )
                    .map((lead) => (
                      <div
                        key={lead.id}
                        style={{
                          marginBottom: "8px",
                          borderRadius: "4px",
                        }}
                        onDoubleClick={() => handleDoubleClick(lead)}
                      >
                        <LeadCard lead={lead} />
                      </div>
                    ))}
                </PipelineColumn>
              </div>
            ))}
          </div>
        )}
        {Object.keys(data.columns).length === 0 && (
          <Box textAlign="center" mt="50px">
            <PipelineColumn title={currentSublink}>
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  style={{
                    marginBottom: "8px",
                    borderRadius: "4px",
                  }}
                  onDoubleClick={() => handleDoubleClick(lead)}
                >
                  <LeadCard lead={lead} />
                </div>
              ))}
            </PipelineColumn>
          </Box>
        )}

        {isModalOpen && (
          <LeadModal lead={selectedLead} onClose={handleCloseModal} />
        )}
      </Box>
      {selectedLead && (
        <LeadOptionsProvider>
          <Action
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            lead={selectedLead}
            onUpdate={updateLead}
          />
        </LeadOptionsProvider>
      )}
    </Box>
  );
};

export default KanbanBoard;
