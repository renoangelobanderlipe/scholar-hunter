<?php

namespace App\Http\Controllers\Scholarship;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateScholarshipFormRequest;
use App\Http\Requests\ScholarshipRequest;
use App\Models\Foundation;
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
    public function index(Request $request)
    {
        return $this->success(
            Scholarship::leftjoin('foundations', 'scholarships.foundation_id', '=', 'foundations.id')
                ->orderBy('foundations.name', 'asc')
                ->paginate(12)
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        // NOTE: OPTIMIZE THIS QUERY @peanut
        $keyword = $request->only(['keyword'])['keyword'];

        return $this->success(
            Scholarship::leftjoin('foundations', 'scholarships.foundation_id', '=', 'foundations.id')
                ->where('foundations.name', 'LIKE', '%' . $keyword . '%')
                ->orderBy('foundations.name', 'asc')
                ->paginate(12)
        );
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
    public function destroy($id)
    {
        //
    }
}
