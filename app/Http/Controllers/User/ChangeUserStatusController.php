<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangeUserStatusFormRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponseTraits;

class ChangeUserStatusController extends Controller
{
    use HttpResponseTraits;
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ChangeUserStatusFormRequest $request, User $user)
    {
        $user->update($request->validated());

        return $this->success([
            'user' => $user
        ]);
    }
}
