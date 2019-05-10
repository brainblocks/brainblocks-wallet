module.exports.setAuthCookie = function(res, token) {
  res.cookie(process.env.AUTH_TOKEN_COOKIE_KEY, token, {
    secure: process.env.IS_HTTPS == 'true',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: process.env.AUTH_TOKEN_COOKIE_EXPIRY_DAYS * 24 * 3600 * 1000
  })
}

module.exports.deleteAuthCookie = function(res, token) {
  res.clearCookie(process.env.AUTH_TOKEN_COOKIE_KEY, token, {
    secure: process.env.IS_HTTPS == 'true',
    httpOnly: true,
    sameSite: 'lax'
  })
}
