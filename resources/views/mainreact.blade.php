<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{env("APP_ENV") === "local" ? "[LOCAL] " : ""}}{{env("APP_NAME")}}</title>
</head>

<body>
  <div id="root">you need to enable javascript to load this page.</div>
  @vite(['resources/js/app.jsx'])
</body>

</html>