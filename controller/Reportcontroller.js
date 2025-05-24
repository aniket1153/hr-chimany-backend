const Report = require('../models/Reportmodel');

exports.createReport = async (req, res) => {
  try {
    const { reportTitle, reportContent } = req.body;
    const report = new Report({
      reportTitle,
      reportContent,
      createdBy: req.user.id
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating report' });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('createdBy', 'name email role');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching reports' });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Report not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating report' });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const deleted = await Report.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Report not found' });
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting report' });
  }
};
