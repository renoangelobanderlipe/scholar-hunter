<?php

namespace App\Http\Controllers\Scholarship;

use App\Http\Controllers\Controller;
use App\Http\Requests\ScholarshipRequest;
use App\Models\Scholarship;
use App\Traits\FoundationTraits;
use Illuminate\Http\Request;
use App\Traits\HttpResponse;

class ScholarshipController extends Controller
{
    use HttpResponse, FoundationTraits;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return (new Scholarship)->index();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        return (new Scholarship)->search($request->only(['keyword'])['keyword'] == null ? '' : $request->only(['keyword'])['keyword']);
    }

    public function all()
    {
        return (new Scholarship)->foundations();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return (new Scholarship)->create($request->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ScholarshipRequest $request)
    {
        return (new Scholarship)->apply((object)$request->all());
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
    public function destroy(Request $request)
    {
    }

    public function scholarships()
    {
        return (new Scholarship)->listOfScholars();
    }

    public function scholarshipDestroy(Request $request)
    {
        return (new Scholarship)->deleteScholarship($request->all()['id']);
    }

    public function scholarsList()
    {
        return (new Scholarship)->scholarsList();
    }
    public function download(Request $request)
    {
        return (new Scholarship)->downloadFile($request->all()['id']);
    }

    public function approve(Request $request)
    {
        return (new Scholarship)->approveScholarship($request->all()['id']);
    }

    public function cancel(Request $request)
    {
        return (new Scholarship)->cancelScholarship($request->all()['id']);
    }
}
