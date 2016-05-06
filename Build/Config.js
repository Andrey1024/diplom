require.config({
    paths: {
        'solver': '../lib/solver/js-solver',
        'idd': '../lib/idd/idd',
        'jquery': '../lib/jquery/jquery',
        'modernizer': "../lib/modernizr/modernizr",
        "rx": "../lib/rxjs/rx.all",
        "knockout": "../lib/knockout/knockout",
        "tinycolor2": "../lib/tinycolor/tinycolor",
        'jquery-ui': '../lib/jquery-ui',
        "knockout-jqueryui": "../lib/knockout-jqueryui",
    },
    shim: {
        'solver': {
            exports: 'Module'
        }
    }
});
