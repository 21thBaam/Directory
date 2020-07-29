const testController = {};

testController.getTest = async (req, res) => {
    res.send("Hello World");
};

module.exports = testController;