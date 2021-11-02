<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    /**
     * @OA\Info(
     *      version="1.0.0",
     *      title="L5 OpenApi",
     *      description="L5 Swagger OpenApi description",
     *      @OA\Contact(
     *          email="darius@matulionis.lt"
     *      ),
     *     @OA\License(
     *         name="Apache 2.0",
     *         url="http://www.apache.org/licenses/LICENSE-2.0.html"
     *     )
     * )
     */

    /**
     *  @OA\Server(
     *      url=SWAGGER_LUME_CONST_HOST,
     *      description="L5 Swagger OpenApi dynamic host server"
     *  )
     *
     *  @OA\Server(
     *      url="https://projects.dev/api/v1",
     *      description="L5 Swagger OpenApi Server"
     * )
     */

    /**
     * @OA\OpenApi(
     *   security={
     *     {
     *       "oauth2": {"read:oauth2"},
     *     }
     *   }
     * )
     */

    /**
     * @OA\Tag(
     *     name="project",
     *     description="Everything about your Projects",
     *     @OA\ExternalDocumentation(
     *         description="Find out more",
     *         url="http://swagger.io"
     *     )
     * )
     *
     * @OA\Tag(
     *     name="user",
     *     description="Operations about user",
     *     @OA\ExternalDocumentation(
     *         description="Find out more about",
     *         url="http://swagger.io"
     *     )
     * )
     * @OA\ExternalDocumentation(
     *     description="Find out more about Swagger",
     *     url="http://swagger.io"
     * )
     */
}
