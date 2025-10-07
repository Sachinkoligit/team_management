import Board from "../models/Board.models.js";

export const getBoards = async (req, res) => {
  try {
    const { name } = req.body;
    Board.create({ name });
    res.status(200).json({ message: "Created" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createBoards = async (req, res) => {
  try {
    const { name } = req.body;
    Board.create({ name });
    res.status(200).json({ message: "Created" });
  } catch (error) {
    res.status(500).json(error);
  }
};
