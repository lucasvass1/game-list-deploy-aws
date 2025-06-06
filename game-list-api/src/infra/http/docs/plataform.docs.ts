/**
 * @swagger
 * tags:
 *   name: Plataform
 *   description: Plataform management
 */

/**
 * @swagger
 * /plataform:
 *   post:
 *     summary: Create a new plataform
 *     tags: [Plataform]
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: PlayStation 5
 *               company:
 *                 type: string
 *                 example: Sony
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               acquisitionYear:
 *                 type: integer
 *                 example: 2020
 *     responses:
 *       201:
 *         description: Plataform created successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Plataform already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /plataform:
 *   get:
 *     summary: Get all plataforms
 *     tags: [Plataform]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, createdAt, updatedAt, acquisitionYear]
 *           default: createdAt
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: List of plataforms
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /plataform/{id}:
 *   put:
 *     summary: Update a plataform by ID
 *     tags: [Plataform]
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
 *                 example: PlayStation 5 Slim
 *               company:
 *                 type: string
 *                 example: Sony
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               acquisitionYear:
 *                 type: integer
 *                 example: 2023
 *     responses:
 *       200:
 *         description: Plataform updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Plataform not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /plataform/{id}:
 *   delete:
 *     summary: Delete a plataform by ID
 *     tags: [Plataform]
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
 *         description: Plataform deleted
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Plataform not found
 *       500:
 *         description: Internal server error
 */
