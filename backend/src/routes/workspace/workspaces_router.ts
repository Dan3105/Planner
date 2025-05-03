import express from "express";
import { getAllWorkspaces, getWorkspaceById } from "../../module/read_operations/workspace";
import { createWorkspace, deleteWorkspace, updateWorkspace } from "../../module/write_operations/workspace";

const workspaces_router = express.Router();

// Get all workspaces
workspaces_router.get("/", async (_req, res) => {
    try {
        const workspaces = await getAllWorkspaces();
        res.json(workspaces);
    } catch (error) {
        console.log('Error fetching all workspaces:', error);
        res.status(500).json({ error: "Failed to fetch workspaces" });
    }
});

// Get workspace by ID
workspaces_router.get("/:id", async (req, res) => {
    try {
        const workspace = await getWorkspaceById(req.params.id);
        if (!workspace) {
            res.status(404).json({ error: "Workspace not found" });
            return;
        }
        res.json(workspace);
    } catch (error) {
        console.log('Error fetching workspace by ID:', error);
        res.status(500).json({ error: "Failed to fetch workspaces" });
    }
});

// Update workspace
workspaces_router.put("/:id", async (req, res) => {
    try {
        const { title } = req.body;
        const workspace = await updateWorkspace(req.params.id, title)
        if (!workspace) {
            res.status(404).json({ error: "Workspace not found" });
            return;
        }
        res.json(workspace);
    } catch (error) {
        console.log('Error updating workspace:', error);
        res.status(500).json({ error: "Failed to update workspace" });
    }    
})

// Create new workspace
workspaces_router.post("/", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            res.status(400).json({ error: "Title is required" });
            return;
        }
        const workspace = await createWorkspace(title);
        res.status(201).json(workspace);
    } catch (error) {
        console.log('Error creating workspace:', error);
        res.status(500).json({ error: "Failed to create workspace" });
    }
});

// Delete workspace
workspaces_router.delete("/:id", async(req, res) => {
    try {
        const workspace = await deleteWorkspace(req.params.id);
        res.json(workspace);
    } catch (error) {
        console.log('Error deleting workspace:', error);
        res.status(500).json({ error: "Failed to delete workspace" });
    }
})

export default workspaces_router;
