<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateUserFormRequest;
use App\Models\User;
use App\Traits\HttpResponseTraits;
use App\Traits\UserTrait;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    use HttpResponseTraits;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        dd('test',\Auth::user());
        // return $this->success(['role' => $this->userRole(), 'status' => $this->userStatus()]);
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
    public function store(CreateUserFormRequest $request)
    {
        $request_data = $request->validated();
        $request_data['password'] = Hash::make($request['password']);

        $user = User::create($request_data);

        // $request->validated($request->only([
        //     'firstname', 'middlename', 'lastname', 'address', 'username', 'email', 'password', 'status',
        // ]));

        // $user = User::create([
        //     'firstname' => $request->firstname,
        //     'middlename' => $request->middlename,
        //     'lastname' => $request->lastname,
        //     'address' => $request->address,
        //     'username' => $request->username,
        //     'email' => $request->email,
        //     'course' => $request->course,
        //     'degree' => $request->degree,
        //     'account_type' => $request->account_type,
        //     'school' => $request->school,
        //     'password' => Hash::make($request->password),
        //     'status' => 0,
        // ]);
        // This will be fix later with to add abilities to the token


        return $this->success([
            'user' => $user,
            // 'token' => $user->createToken('auth-token')->plPPnTextToken,
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
