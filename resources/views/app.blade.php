@php
    $appSetting = app(\App\Settings\SiteSettings::class);
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">


      <title inertia>{{ \Artesaos\SEOTools\Facades\SEOTools::getTitle() }}</title>

      <!-- SEO -->
        {!! app('seotools')->generate() !!}

        @if(!empty($appSetting->custom_js))
            {!! $appSetting->custom_js !!}
        @endif
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.15.0/videojs-contrib-hls.min.js" integrity="sha512-R1+Pgd+uyqnjx07LGUmp85iW8MSL1iLR2ICPysFAt8Y4gub8C42B+aNG2ddOfCWcDDn1JPWZO4eby4+291xP9g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
