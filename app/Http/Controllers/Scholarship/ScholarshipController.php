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

    protected $scholarship;

    public function __construct()
    {
        $this->scholarship = new Scholarship;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->scholarship->index();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        return $this->scholarship->search($request->only(['keyword'])['keyword'] == null ? '' : $request->only(['keyword'])['keyword']);
    }

    public function edit(Request $request)
    {
        dd($request->all());
    }

    public function all()
    {
        return $this->scholarship->foundations();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return $this->scholarship->create($request->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ScholarshipRequest $request)
    {
        return $this->scholarship->apply((object)$request->all());
    }

    public function scholarships()
    {
        return $this->scholarship->listOfScholars();
    }

    public function scholarshipDestroy(Request $request)
    {
        return $this->scholarship->deleteScholarship($request->all()['id']);
    }

    public function scholarsList()
    {
        return $this->scholarship->scholarsList();
    }
    public function download(Request $request)
    {
        return $this->scholarship->downloadFile($request->all()['id']);
    }

    public function approve(Request $request)
    {
        return $this->scholarship->approveScholarship($request->all()['id']);
    }

    public function cancel(Request $request)
    {
        return $this->scholarship->cancelScholarship($request->all()['id']);
    }

    public function info(Request $request)
    {
        return $this->scholarship->info($request->all()['id']);
    }
}
