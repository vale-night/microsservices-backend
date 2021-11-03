<?php

namespace App\Http\Controllers;

use App\Contracts\EventRepositoryInterface;
use App\Http\Requests\SearchEventRequest;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Http\Request;

class EventController extends Controller
{
    public function __construct(private EventRepositoryInterface $eventRepository)
    {}

    /**
     * @OA\Get(
     *      path="/events/{id}",
     *      operationId="index",
     *      tags={"Events"},
     *      summary="Get events informations",
     *      description="Returns events",
     *      @OA\Response(
     *          response=200,
     *          description="successful operation"
     *       ),
     * )
     */
    public function index(): JsonResponse
    {
        $events = $this->eventRepository->all();
        return response()->json($events);
    }

    /**
     * @OA\Post(
     *      path="/events",
     *      operationId="store",
     *      tags={"Events"},
     *      summary="Create a new event",
     *      description="Returns event",
     *      @OA\RequestBody(
     *          @OA\JsonContent(
     *              @OA\Property(property="name", type="string", description="Name of the event", example="Nome do evento"),
     *              @OA\Property(property="description", type="string", description="Description of the event", example="Descriçãp da festa"),
     *              @OA\Property(property="highlight", type="boolean", description="Is highlight event", example="true"),
     *              @OA\Property(property="age_group", type="string", description="Age group of event", example="Jovens")
     *         )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation"
     *       ),
     * )
     *
     *
     * @param StoreEventRequest $request
     * @return JsonResponse
     */
    public function store(StoreEventRequest $request): JsonResponse
    {
        $event = $this->eventRepository->create($request->all());
        return response()->json($event);
    }


    /**
     * @Rest\Get(
     *      path="/events/{id}",
     *      operationId="show",
     *      tags={"Events"},
     *      summary="Get event informations",
     *      description="Returns event",
     *      @OA\Parameter(
     *          name="id",
     *          description="Event id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation"
     *      )
     * )
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function show(Request $request, $id): JsonResponse
    {
        $event = $this->eventRepository->find($id);
        return response()->json($event);
    }


    /**
     * @OA\Put(
     *      path="/events/{id}",
     *      operationId="update",
     *      tags={"Events"},
     *      summary="Update event",
     *      description="Returns event",
     *      @OA\Parameter(
     *          name="id",
     *          description="Event id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          @OA\JsonContent(
     *              @OA\Property(property="name", type="string", description="Name of the event", example="Nome do evento"),
     *              @OA\Property(property="description", type="string", description="Description of the event", example="Descriçãp da festa"),
     *              @OA\Property(property="highlight", type="boolean", description="Is highlight event", example="true"),
     *              @OA\Property(property="age_group", type="string", description="Age group of event", example="Jovens")
     *         )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation"
     *       )
     * )
     *
     * @param UpdateEventRequest $request
     * @param $id
     * @return JsonResponse
     */
    public function update(UpdateEventRequest $request, $id): JsonResponse
    {
        $event = $this->eventRepository->update($request->all(), $id);
        return response()->json($event);
    }

    
        /**
     * @OA\Delete(
     *      path="/events/{id}",
     *      operationId="delete",
     *      tags={"Events"},
     *      summary="delete event",
     *      description="Delete event",
     *      @OA\Parameter(
     *          name="id",
     *          description="Event id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="successful operation"
     *       )
     * )
     *
     * @param UpdateEventRequest $request
     * @param $id
     * @return JsonResponse
     */
    public function delete(Request $request, $id)
    {
        $this->eventRepository->delete($id);
        return response()->noContent();
    }

    public function search(Request $request): JsonResponse
    {
        $events = $this->eventRepository->search($request->query());
        return response()->json($events);
    }

}
