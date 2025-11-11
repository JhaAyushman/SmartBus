import { Router } from "express";
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let routesData;

async function loadRoutesData() {
  const data = await readFile(path.join(__dirname, '../routes.json'), 'utf8');
  routesData = JSON.parse(data);
}

await loadRoutesData();

const router = Router();

// // GET all buses
// router.get("/", async (req, res) => {
//   try {
//     const allBuses = await Bus.find();
//     res.json(allBuses);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: false, message: "Error fetching buses" });
//   }
// });

// // Search buses
// router.post("/search", async (req, res) => {
//   const { startCity, destination } = req.body;
//   try {
//     const buses = await Bus.find({ startCity, destination });
//     res.json({ status: true, buses });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: false, message: "Error searching buses" });
//   }
// });

// Get bus by ID
// router.post("/getById", async (req, res) => {
//   const { bId } = req.body;
//   try {
//     const bus = await Bus.findById(bId);
//     if (!bus) return res.status(404).json({ status: false, message: "Bus not found" });
//     res.json({ status: true, bus });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: false, message: "Error fetching bus by ID" });
//   }
// });
// GET all buses - serve mock data directly
router.get("/", (req, res) => {
  res.json(routesData);
});

// Search buses filtered from mock data
router.post('/search', (req, res) => {
  const { startCity, destination } = req.body;
  const filteredBuses = routesData.filter(bus => 
     bus.startCity.toLowerCase() === startCity.toLowerCase() &&
     bus.destination.toLowerCase() === destination.toLowerCase()
  );
  res.json({ status: true, buses: filteredBuses });
});

// Get bus by ID from mock data
router.post("/getById", (req, res) => {
  const { bId } = req.body;
  const bus = routesData.find((bus) => bus._id === bId);
  if (!bus) return res.status(404).json({ status: false, message: "Bus not found" });
  res.json({ status: true, bus });
});




export default router;
