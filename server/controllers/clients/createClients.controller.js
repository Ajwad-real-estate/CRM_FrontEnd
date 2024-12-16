import { createClientService } from "../../services/clientServices/createClient.services.js";

const createMultipleClients = async (req, res) => {
  const clients = req.body.clients;

  if (!clients || clients.length === 0) {
    return res.status(400).json({ message: "No clients provided." });
  }

  const results = [];
  const errors = [];

  for (const client of clients) {
    try {
      const result = await createClientService(client);
      results.push(result);
    } catch (error) {
      errors.push({
        client: client.name || "Unknown",
        message: error.message,
      });
    }
  }

  res.status(207).json({
    message: "Create Clients completed.",
    success: results,
    failed: errors,
  });
};

export default createMultipleClients;
