<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateApplicationFormRequest;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Traits\HttpResponseTraits;

class ApplicationController extends Controller
{
    use HttpResponseTraits;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateApplicationFormRequest $request)
    {
        $files = [];

        if($request->hasFile('attachments')) {
            foreach($request->file('attachments') as $attachment) {
                array_push($files, Storage::putFile('public/files/attachments', $attachment));
            }
        }

        $application = Application::create([
            'user_id' => $request->validated('user_id'),
            'scholarship_id' => $request->validated('scholarship_id'),
            'status' => $request->validated('status'),
            'attachments' => $files,
        ]);

        return $this->success([
            'application' => $application
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
