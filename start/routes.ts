/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('login', [AuthController, 'login'])

    router.group(() => {
      router.get('logout', [AuthController, 'logout'])

      router
        .get('me', async ({ auth }) => {
          return auth.user
        })
        .use(
          middleware.auth({
            guards: ['api'],
          })
        )
    })
  })
  .prefix('/api')
