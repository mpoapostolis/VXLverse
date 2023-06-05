import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/', '/api/games'],
})

export const config = {
  matcher: ['/', '/api/publish', '/api/games/', '/api/games/:slug*'],
}
