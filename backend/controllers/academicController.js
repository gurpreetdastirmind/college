import { AcademicResource } from '../models/index.js';
import fs from 'fs';
import path from 'path';

// GET /api/academics?category=syllabus&subcategory=B.Com  (public)
export const getResources = async (req, res) => {
  try {
    const { category, subcategory, folder_name } = req.query;
    const where = { is_active: true };
    if (category) where.category = category;
    if (subcategory) where.subcategory = subcategory;
    if (folder_name) where.folder_name = folder_name;

    const items = await AcademicResource.findAll({
      where,
      order: [['publish_date', 'DESC'], ['id', 'DESC']],
    });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/academics/all  (admin only — includes inactive)
export const getAllResources = async (req, res) => {
  try {
    const { category } = req.query;
    const where = {};
    if (category) where.category = category;

    const items = await AcademicResource.findAll({
      where,
      order: [['id', 'DESC']],
    });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/academics  (admin only)
export const createResource = async (req, res) => {
  try {
    const { title, category, folder_name, subcategory, description, link_url, publish_date } = req.body;
    
    let file_url = null;

    // Handle file upload and folder creation
    if (req.file) {
      // Sanitize folder name: replace spaces/special chars with hyphens
      const safeFolderName = folder_name 
        ? folder_name.trim().replace(/[^a-zA-Z0-9]/g, '-') 
        : 'General';

      // Define the target directory: uploads/pdfs/FolderName
      const uploadDir = path.join(process.cwd(), 'uploads', 'pdfs', safeFolderName);

      // Create the folder if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Move the file from its temporary upload location to the new folder
      const oldPath = req.file.path;
      const newPath = path.join(uploadDir, req.file.filename);
      
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
      }

      // Save the relative URL to the database
      file_url = `/uploads/pdfs/${safeFolderName}/${req.file.filename}`;
    }

    const item = await AcademicResource.create({
      title,
      category,
      folder_name: folder_name || null,
      subcategory: subcategory || null,
      description: description || null,
      link_url: link_url || null,
      file_url,
      publish_date: publish_date || null,
    });
    res.status(201).json({ success: true, item });
  } catch (err) {
    console.error('Error creating resource:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/academics/:id  (admin only)
export const updateResource = async (req, res) => {
  try {
    const item = await AcademicResource.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });

    const { title, category, folder_name, subcategory, description, link_url, publish_date } = req.body;

    // If a new PDF was uploaded, move it to the correct folder and delete the old one
    if (req.file) {
      const safeFolderName = folder_name 
        ? folder_name.trim().replace(/[^a-zA-Z0-9]/g, '-') 
        : 'General';

      const uploadDir = path.join(process.cwd(), 'uploads', 'pdfs', safeFolderName);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const oldPath = req.file.path;
      const newPath = path.join(uploadDir, req.file.filename);
      
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
      }

      // Delete the old file from the server
      if (item.file_url) {
        const oldFilePath = path.join(process.cwd(), item.file_url);
        if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
      }

      item.file_url = `/uploads/pdfs/${safeFolderName}/${req.file.filename}`;
    }

    if (title !== undefined) item.title = title;
    if (category !== undefined) item.category = category;
    if (folder_name !== undefined) item.folder_name = folder_name || null;
    if (subcategory !== undefined) item.subcategory = subcategory || null;
    if (description !== undefined) item.description = description || null;
    if (link_url !== undefined) item.link_url = link_url || null;
    if (publish_date !== undefined) item.publish_date = publish_date || null;

    await item.save();
    res.json({ success: true, item });
  } catch (err) {
    console.error('Error updating resource:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/academics/:id
export const deleteResource = async (req, res) => {
  try {
    const item = await AcademicResource.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });

    // Remove the file from the server
    if (item.file_url) {
      const filePath = path.join(process.cwd(), item.file_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};