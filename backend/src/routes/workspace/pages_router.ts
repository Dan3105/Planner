import express from "express";
import { createPage, deletePage, updateMetadataPage, updatePage } from "../../module/write_operations/page";
import { CreatePageDto, UpdatePageDto } from "../../module/dtos/page_dto";

const pages_router = express.Router();

// Create new page
pages_router.post("/", async (req, res) => {
    try {
        const pageDto: CreatePageDto = req.body;
        if (!pageDto.title || !pageDto.workspaceId) {
            res.status(400).json({ error: "Title and workspaceId are required" });
            return;
        }
        const page = await createPage(pageDto);
        res.status(201).json(page);
    } catch (error) {
        console.log("Error creating page:", error);
        res.status(500).json({ error: "Failed to create page" });
    }
});

// Update page metadata
pages_router.put("/:id/metadata", async (req, res) => {
    try {
        const updateDto: UpdatePageDto = req.body;
        const page = await updateMetadataPage(req.params.id, updateDto);
        res.json(page);
    } catch (error) {
        console.log("Error updating page metadata:", error);
        res.status(500).json({ error: "Failed to update page metadata" });
    }
});

// Update page content
pages_router.put("/:id/content", async (req, res) => {
    try {
        const content = req.body.content;
        const page = await updatePage(req.params.id, content);
        res.json(page);
    } catch (error) {
        console.log("Error updating page content:", error);
        res.status(500).json({ error: "Failed to update page content" });
    }
});

// Delete page
pages_router.delete("/:id", async (req, res) => {
    try {
        const page = await deletePage(req.params.id);
        res.json(page);
    } catch (error) {
        console.log("Error deleting page:", error);
        res.status(500).json({ error: "Failed to delete page" });
    }
});

export default pages_router;
