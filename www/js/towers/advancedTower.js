Puzzles.advanced = {};

Towers.advanced = new Tower('advanced', [
        ['4-4','4-2','4-1','3-7','3-9','3-8'],
        ['4-6','4-X','4-3','3-5','3-X','3-6'],
        ['4-8','4-7','4-5','3-3','3-2','3-4'],
        [ null,'4-9', null, null,'3-1', null],
        [ null,'1-9', null, null,'2-9', null],
        ['1-4','1-6','1-8','2-4','2-6','2-8'],
        ['1-2','1-X','1-7','2-2','2-X','2-7'],
        ['1-1','1-3','1-5','2-1','2-3','2-5']
    ], {

        '1-1': {
            first: true,
            paths: 'UR'
        },
        '1-2': {
            paths: 'UR'
        },
        '1-3': {
            paths: 'UR'
        },
        '1-4': {
            paths: 'R'
        },
        '1-5': {
            paths: 'UR'
        },
        '1-6': {            
            paths: 'DUR'
        },
        '1-7': {
            paths: 'UL'
        },
        '1-8': {
        },
        '1-9': {
        },
        '1-X': {
            requires: 36
        },

        '2-1': {            
            requires: 7
        },
        '2-2': {

        },
        '2-3': {

        },
        '2-4': {

        },
        '2-5': {

        },
        '2-6': {

        },
        '2-7': {

        },
        '2-8': {

        },
        '2-9': {

        },
        '2-X': {

        },

        '3-1': {

        },
        '3-2': {

        },
        '3-3': {

        },
        '3-4': {

        },
        '3-5': {

        },
        '3-6': {

        },
        '3-7': {

        },
        '3-8': {

        },
        '3-9': {

        },
        '3-X': {

        },

        '4-1': {

        },
        '4-2': {

        },
        '4-3': {

        },
        '4-4': {

        },
        '4-5': {

        },
        '4-6': {

        },
        '4-7': {

        },
        '4-8': {

        },
        '4-9': {

        },
        '4-X': {

        },


});