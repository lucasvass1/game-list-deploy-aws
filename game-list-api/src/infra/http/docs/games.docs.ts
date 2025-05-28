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
 *         description: Missing required fields. Or Invalid status. Or End date is required when status is DONE or ABANDONED.
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
 *         description: Missing required fields. Or Invalid status. Or End date is required when status is DONE or ABANDONED.
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
 *         description: Missing required fields.
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */
