const getTest = async (req, res) => {
    res.status(200).json({
         message: 'Test API from test controller working fine.' 
    });
}
module.exports.getTest = getTest;