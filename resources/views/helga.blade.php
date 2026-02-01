<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <meta name="format-detection" content="telephone=no">

    <!-- Primary Meta Tags -->
    <meta name="title" content="Marcell & Lisa - Wedding Invitation">
    <meta name="description" content="Hi, You're invited to our wedding ceremony - Marcell & Lisa Wedding">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Wedding Invitation">
    <meta property="og:title" content="Marcell & Lisa - Wedding Invitation" />
    <meta property="og:description" content="Hi, You're invited to our wedding ceremony - Marcell & Lisa Wedding" />

    <title inertia>{{ config('app.name', 'Wedding Invitation') }}</title>

    <!-- jQuery (required by template) -->
    <script src="/template/src/jquery.js"></script>

    <!-- Fonts Google - Roboto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap">

    <!-- Fonts - Playfair Display & Marcellus -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap">

    <!-- Helga Template CSS -->
    <link rel="stylesheet" href="/template/plugin/selectize/dist/css/selectize.default.css">
    <link rel="stylesheet" href="/template/plugin/flexbin/flexbin.css" media="all">
    <link rel="stylesheet" href="/template/plugin/aos/dist/aos.css">
    <link rel="stylesheet" href="/template/plugin/lightgallery/dist/css/lightgallery.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css">
    <link rel="stylesheet" href="/template/plugin/slick/slick.css">
    <link rel="stylesheet" href="/template/plugin/modal-video/css/modal-video.min.css">

    <!-- Phosphor Icons -->
    <script src="https://unpkg.com/@phosphor-icons/web"></script>

    <!-- Video JS -->
    <link href="https://vjs.zencdn.net/8.16.1/video-js.css" rel="stylesheet" />

    <!-- Template Styles -->
    <link rel="stylesheet" href="/template/src/universal.css">
    <link rel="stylesheet" href="/template/src/template/global.css">
    <link rel="stylesheet" type="text/css" href="/template/src/kado-template.1759120915.css">
    <link rel="stylesheet" type="text/css" href="/template/src/rundown-template.1762934182.css">
    <link rel="stylesheet" type="text/css" href="/template/src/note-template.1756182997.css">
    <link rel="stylesheet" type="text/css" href="/template/src/bank-template.1759120915.css">
    <link rel="stylesheet" href="/template/src/template/exclusive-helga.1764902159.css">

    <!-- Colors -->
    <style>
        body {
            --background-primary: #EAE2DC !important;
            --background-primary-rgb: 234, 226, 220 !important;
            --background-secondary: #7D2229 !important;
            --background-secondary-rgb: 125, 34, 41 !important;
            --background-tertiary: #A5785D !important;
            --background-tertiary-rgb: 165, 120, 93 !important;
            --text-primary: #89565C !important;
            --text-primary-rgb: 137, 86, 92 !important;
            --text-secondary: #404040 !important;
            --text-secondary-rgb: 64, 64, 64 !important;
            --text-tertiary: #EAE2DC !important;
            --text-tertiary-rgb: 234, 226, 220 !important;
            --button-text-primary: #EAE2DC !important;
            --button-text-primary-rgb: 234, 226, 220 !important;
            --button-background-primary: #89565C !important;
            --button-background-primary-rgb: 137, 86, 92 !important;
            --button-text-secondary: #89565C !important;
            --button-text-secondary-rgb: 137, 86, 92 !important;
            --button-background-secondary: #EAE2DC !important;
            --button-background-secondary-rgb: 234, 226, 220 !important;
        }
    </style>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="helga original preset-original" data-template="helga">
    @inertia

    <!-- Plugins -->
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@3.9.1/tsparticles.bundle.min.js"></script>
    <script src="/template/plugin/aos/dist/aos.js"></script>
    <script src="/template/plugin/slick/slick.min.js"></script>
    <script src="/template/plugin/selectize/dist/js/standalone/selectize.min.js"></script>
    <script src="/template/plugin/modal-video/js/jquery-modal-video.min.js"></script>
    <script src="/template/plugin/lightgallery/dist/js/lightgallery.min.js"></script>

    <!-- Video JS -->
    <script src="https://vjs.zencdn.net/8.16.1/video.min.js"></script>
    <script src="https://unpkg.com/videojs-youtube/dist/Youtube.min.js"></script>
    <script type="text/javascript" src="/template/src/js/html2canvas-1.4.1.1749130377.js"></script>

    <!-- Template Scripts -->
    <script>
        window.CROPPED_SONG = {
            start: null,
            end: null,
        };

        window.LANGUAGE_TOGGLE = 0;

        // Music
        var MUSIC = {
            'url': "https://media.katsudoto.id/media/audio/template/romantic-waltz.mp3",
            'box': '#music-box'
        };

        // Event
        var EVENT = 1706414400;

        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1200,
                once: false
            });
        }
    </script>

    <script src="/template/src/universal.js"></script>
    <script src="/template/src/template/template.js"></script>
</body>

</html>
