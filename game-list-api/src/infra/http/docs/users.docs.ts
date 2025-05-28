/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate user (login) using Basic Auth
 *     tags: [Users]
 *     description: Send the credentials using Basic Auth in the Authorization header. The format is 'Basic base64(email:password)'. Returns a JWT token on success.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Basic authentication header. Format: Basic base64(email:password)
 *         schema:
 *           type: string
 *           example: Basic am9obmRvZUBleGFtcGxlLmNvbToxMjM0NTY=
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: userId123
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                 token:
 *                   type: string
 *                   example: jwt_token
 *       400:
 *         description: Invalid Authorization header format
 *       401:
 *         description: Invalid credentials or missing Authorization header
 *       500:
 *         description: Internal server error
 */
