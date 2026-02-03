<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <meta name="format-detection" content="telephone=no">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('images/favicon.ico') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/favicon-16x16.png') }}">

    <!-- Primary Meta Tags -->
    @php
    $invitation = $page['props']['invitation'] ?? null;
    $brideShortName = $invitation['bride_name'] ?? 'Bride';
    $groomShortName = $invitation['groom_name'] ?? 'Groom';
    $coupleNames = $brideShortName . ' & ' . $groomShortName;
    $pageTitle = $coupleNames . ' - Wedding Invitation';
    $pageDescription = 'Hi, You\'re invited to our wedding ceremony - ' . $coupleNames . ' Wedding';
    $coverImage = $invitation['cover_photo'] ?? '';
    $siteUrl = url()->current();
    @endphp
    <meta name="title" content="{{ $pageTitle }}">
    <meta name="description" content="{{ $pageDescription }}">
    <meta name="keywords" content="wedding invitation, {{ $coupleNames }}, pernikahan, undangan pernikahan">
    <meta name="author" content="{{ $coupleNames }}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $siteUrl }}" />
    <meta property="og:site_name" content="Wedding Invitation">
    <meta property="og:title" content="{{ $pageTitle }}" />
    <meta property="og:description" content="{{ $pageDescription }}" />
    <meta property="og:image" content="{{ $coverImage }}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="{{ $siteUrl }}" />
    <meta name="twitter:title" content="{{ $pageTitle }}" />
    <meta name="twitter:description" content="{{ $pageDescription }}" />
    <meta name="twitter:image" content="{{ $coverImage }}" />

    <title inertia>{{ $pageTitle }}</title>

    <!-- jQuery (required by template) -->
    <script src="/template/src/jquery.js"></script>

    <!-- Fonts Google - Roboto -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap">

    <!-- Fonts - Playfair Display & Marcellus -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap">

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
    @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
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
            'url': "{{ $page['props']['invitation']['audio_url'] ?? "https://media.katsudoto.id/media/audio/template/romantic-waltz.mp3" }}",
            'box': '#music-box'
        };

        // Event
        var EVENT = 1706414400;

        // Particle Effect Configuration
        var USING_EFFECT = 1;
        var EFFECT = 1; // 1 = stars/sparkles
        var EFFECT_VOLUME = 80;
        var EFFECT_SPEED = 3;

        const desktopMode = window.matchMedia('(min-width: 961px)');
        if (desktopMode.matches && (USING_EFFECT == 1)) {
            $(document).ready(function() {
                const primaryPane = $('.primary-pane');
                const hasPrimaryPane = primaryPane.length;

                if (hasPrimaryPane) {
                    $('#kat__effect').remove();
                    primaryPane.find('.inner').append('<div id="kat__effect"></div>');

                    // Initialize particles
                    if (typeof tsParticles !== 'undefined') {
                        tsParticles.load("kat__effect", {
                            background: {
                                color: {
                                    value: "transparent"
                                }
                            },
                            fpsLimit: 120,
                            particles: {
                                number: {
                                    value: EFFECT_VOLUME,
                                    density: {
                                        enable: true,
                                        value_area: 800
                                    }
                                },
                                color: {
                                    value: ["#ffffff", "#f0e6d6", "#e8dcc8"]
                                },
                                shape: {
                                    type: "circle"
                                },
                                opacity: {
                                    value: 0.8,
                                    random: true,
                                    anim: {
                                        enable: true,
                                        speed: 1,
                                        opacity_min: 0.1,
                                        sync: false
                                    }
                                },
                                size: {
                                    value: 3,
                                    random: true,
                                    anim: {
                                        enable: true,
                                        speed: EFFECT_SPEED,
                                        size_min: 0.1,
                                        sync: false
                                    }
                                },
                                move: {
                                    enable: true,
                                    speed: EFFECT_SPEED / 2,
                                    direction: "none",
                                    random: true,
                                    straight: false,
                                    out_mode: "out",
                                    bounce: false
                                }
                            },
                            interactivity: {
                                detect_on: "canvas",
                                events: {
                                    onhover: {
                                        enable: false
                                    },
                                    onclick: {
                                        enable: false
                                    },
                                    resize: true
                                }
                            },
                            retina_detect: true
                        });
                    }
                }
            });
        }

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
