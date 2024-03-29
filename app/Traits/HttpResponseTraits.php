<?php

namespace App\Traits;

trait HttpResponseTraits
{

  protected function success($data, $code = 200)
  {
    return response()->json([
      'code' => $code,
      'message' => 'Success',
      'data' => $data
    ], $code);
  }

  protected function error($message, $code = 401)
  {
    return response()->json([
      'code' => $code,
      'message' => $message,
    ], $code);
  }
}
