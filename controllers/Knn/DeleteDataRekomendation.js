const connection = require("../../config/db");

const DeleteDataRekomendation = async (req, res) => {
  try {
    const deleteQuery = "DELETE FROM Rekomendasi WHERE rekomendasi_id = ?";
    connection.execute(deleteQuery, [req.body.id], (err) => {
      if (err) {
        console.error("Error delete data rekomendation:", err);
        return res
          .status(500)
          .json({ error: err, message: "Error delete data rekomendation" });
      }
      console.log("User created successfully");
      res.status(201).json({
        message: "Deletion successful",
        data: {
          id: req.body.id,
        },
      });
    });

    console.log("Deletion successful");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = DeleteDataRekomendation;