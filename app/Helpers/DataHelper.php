<?php

namespace App\Helpers;

class DataHelper
{

  public static function getCourses()
  {
    return [
      'Bachelor of Science in Information Technology',
      'Bachelor of Science in Industrial Technology',
      'Bachelor of Science in Mechanical Engineering',
      'Bachelor of Science in Electrical Engineering',
      'Bachelor of Science in Food Technology',
      'Bachelor of Science in Textile Fashion Techonlogy',
      'Bachelor of Science in Criminilogy',
      'Bachelor of Science in Psychology',
      'Bachelor of Elementary Education',
      'Bachelor of Secondary Education',
      'Bachelor of Science in Electro-Mechanical Technology',
      'Bachelor of Science in Hospitality Management',
      'Bachelor of Science in Business Administration',
    ];
  }

  public static function getCourseTypes()
  {
    return [
      'Bachelor',
      'Graduate',
    ];
  }

  public static function getFoundationNames()
  {
    return [
      'Department of Education',
      'Commission on Higher Education',
      'Abono Partylist',
      'City Goverment of San Fernando, La Union',
      'Department of Science and Technology',
      'Manny Pacquiao Foundation',
      'Manny Villar Foundation',
      'Lucio Tan Foundation',
      'Landbank',
      'Microsoft Foundation',
      'Tesda Scholarships',
    ];
  }
  
}