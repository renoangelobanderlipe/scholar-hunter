<?php

namespace App\Traits;

use App\Models\Scholarship;

trait FoundationTraits
{

  protected  function joinScholarship()
  {
    return Scholarship::leftjoin('foundations', 'scholarships.foundation_id', '=', 'foundations.id')->paginate(15)->toArray();
  }
}
