


async function userLogout(req, res) {
  try {
    res.clearCookie("token");

    res.json({
      message: "logout user successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.json({
      message: error.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout;
