<?php

namespace App\Http\Controllers;

use App\Contracts\EventRepositoryInterface;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Http\Request;

class EventController extends Controller
{
    public function __construct(private EventRepositoryInterface $eventRepository)
    {}

    public function index(): JsonResponse
    {
        $events = $this->eventRepository->all();
        return response()->json($events);
    }

    public function store(StoreEventRequest $request): JsonResponse
    {
        $event = $this->eventRepository->create($request->all());
        return response()->json($event);
    }


    public function show(Request $request, $id): JsonResponse
    {
        $event = $this->eventRepository->find($id);
        return response()->json($event);
    }

    public function update(UpdateEventRequest $request, $id): JsonResponse
    {
        $event = $this->eventRepository->update($request->all(), $id);
        return response()->json($event);
    }
}
