/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Games management
 */

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               plataformId:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game created successfully.
 *       400:
 *         description: Bad request. Or Invalid status. Or End date is required when status is DONE or ABANDONED.
 *       500:
 *         description: Internal server error.
 *
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of games.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game by ID
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               plataformId:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Game updated successfully.
 *       400:
 *         description: Bad request. Or Invalid status. Or End date is required when status is DONE or ABANDONED.
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a game by ID
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game deleted.
 *       400:
 *         description: Bad request
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /games/{gameId}/favorite:
 *   post:
 *     summary: Toggle game as favorite
 *     tags: [Games]
 *     description: Marks or unmarks a game as favorite for the authenticated user.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: "Bearer token for authentication"
 *         schema:
 *           type: string
 *           example: Bearer jwt_token
 *       - in: path
 *         name: gameId
 *         required: true
 *         description: The ID of the game to toggle favorite
 *         schema:
 *           type: string
 *           example: gameId123
 *     responses:
 *       200:
 *         description: Favorite status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Game favorited successfully
 *                 isFavorite:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Game not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /games/favorites:
 *   get:
 *     summary: Get user's favorite games
 *     tags: [Games]
 *     description: Retrieves the list of games marked as favorite by the authenticated user, including full game details with category and platform.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: "Bearer token for authentication"
 *         schema:
 *           type: string
 *           example: Bearer jwt_token
 *     responses:
 *       200:
 *         description: List of favorite games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: gameId123
 *                   title:
 *                     type: string
 *                     example: The Legend of Zelda
 *                   status:
 *                     type: string
 *                     enum: [PLAYING, DONE, ABANDONED]
 *                     example: PLAYING
 *                   imageUrl:
 *                     type: string
 *                     example: https://example.com/image.jpg
 *                   description:
 *                     type: string
 *                     example: An epic adventure game.
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-12-31T23:59:59.999Z
 *                   isFavorite:
 *                     type: boolean
 *                     example: true
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: categoryId123
 *                       title:
 *                         type: string
 *                         example: Action
 *                       description:
 *                         type: string
 *                         example: Action games
 *                   plataform:
 *                     type: object
 *                     nullable: true
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: plataformId123
 *                       title:
 *                         type: string
 *                         example: Nintendo Switch
 *                       imageUrl:
 *                         type: string
 *                         example: https://example.com/platform.jpg
 *                       company:
 *                         type: string
 *                         example: Nintendo
 *                       acquisitionYear:
 *                         type: string
 *                         format: date-time
 *                         example: 2017-03-03T00:00:00.000Z
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
