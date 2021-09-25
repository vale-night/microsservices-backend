<?php

namespace App\Http\Controllers;

use App\Contracts\EventRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
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

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'string',
            'highlight' => 'boolean',
            'age_group' => 'string'
        ]);

        if(!$validator->fails()){
            return response()->json([
                $validator->errors()
            ], 422);
        }
        $event = $this->eventRepository->create($request->all());

        return response()->json($event);

    }

    public function show(Request $request, $id): JsonResponse
    {
        $validator = Validator::make([$id], [
            '_id' => 'required|uuid|exists:events,_id'
        ]);

        if(!$validator->fails()){
            return response()->json([
               $validator->errors()
            ], 422);
        }

        $event = $this->eventRepository->find($id);

        return response()->json($event);
    }
}
