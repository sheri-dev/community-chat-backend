const Report = require("../Model/Report");
const user = require("../Model/user");

exports.reportUser = async (req, res) => {
  try {
    const { reportedUser, reportType, description } = req.body;
    const reporter = req.user._id;

    const user = await user.findById(reportedUser);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const report = new Report({
      reporter,
      reportedUser,
      reportType,
      description,
    });

    await report.save();
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
