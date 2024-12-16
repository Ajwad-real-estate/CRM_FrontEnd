import { createClientService } from "../../services/clientServices/createClient.services.js";

const createClient = async (req, res) => {
  try {
    const result = await createClientService(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default createClient;
