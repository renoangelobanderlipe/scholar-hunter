<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{env("APP_ENV") === "local" ? "[LOCAL] " : ""}}{{env("APP_NAME")}}</title>
  <script type="text/javascript">
    const app = {!!
      json_encode([
        "name" => env("APP_NAME"),
        "env" => env("APP_ENV"),
        "url" => url('/'),
        "csrf" => csrf_token()
      ], JSON_PRETTY_PRINT);
    !!};
  </script>
</head>
<body>
  <div id="root">you need to enable javascript to load this page.</div>
  @vite(['resources/js/app.jsx'])
</body>
</html>
