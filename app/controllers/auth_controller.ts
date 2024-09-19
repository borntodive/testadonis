import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return {
      user,
      token: {
        type: 'bearer',
        value: token.value!.release(),
      },
    }
    /**
     * Now login the user or create a token for them
     */
  }

  public async logout({ auth, response }: HttpContext) {
    const user = await auth.authenticate()

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.ok({
      success: true,
      message: 'User logged out',
      data: user,
    })
  }
}
