
const crateStudyGroup = async (req, res) => {
    try {
        const studyGroup = new StudyGroup({
          name: req.body.name,
          description: req.body.description,
          type: req.body.type,
          owner: req.user.id
        });
    
        await studyGroup.save();
        res.status(201).json({ studyGroup });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}