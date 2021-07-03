// graph: {
//     0: [
//         // 1, 2, 3, 4, 6, 8
//         null, [null, [1]]
//     ],
//     1: [0, 2, 4, 7],
//     2: [0, 1, 5, 4, 6, 8],
//     3: [0, 6, 4, 5],
//     4: [0, 1, 2, 3, 5, 6, 7, 8],
//     5: [2, 3, 4, 8],
//     6: [0, 2, 3, 4, 7, 8],
//     7: [1, 4, 6, 8],
//     8: [0, 2, 4, 5, 6, 7]
// },

moveTree = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [

        // 0
        [ 1, 2, 3, 4, 6, 8 ],
        
        // 1
        [0, 2, 4, 7],

        // 2
        [0, 1, 5, 4, 6, 8],

        // 3
        [0, 6, 4, 5],

        // 4
        [0, 1, 2, 3, 5, 6, 7, 8],

        // 5
        [2, 3, 4, 8],

        // 6
        [0, 2, 3, 4, 7, 8],

        // 7
        [1, 4, 6, 8],

        // 8
        [0, 2, 4, 5, 6, 7]
    ],
    [
        // grid indexes
        // [0, 1, 2]
        // [3, 4, 5]
        // [6, 7, 8]

        // 0
        // [ 1, 2, 3, 4, 6, 8 ],
        [null, 2, 1, 6, 8, null, 3, null, 4],
        
        // 1
        // [0, 2, 4, 7]
        [2, null, 0, null, 7, null, null, 4],

        // 2
        // [0, 1, 5, 4, 6, 8],
        [1, 0, null, null, 6, 8, 4, null, 5],

        // 3
        // [0, 6, 4, 5],
        [6, null, null, null, 5, 4, 0],

        // 4
        // [0, 1, 2, 3, 5, 6, 7, 8],
        [8, 7, 6, 5, null, 3, 2, 1, 0],

        // 5
        // [2, 3, 4, 8],
        [null, null, 8, 4, 3, null, null, null, 2],

        // 6
        // [0, 2, 3, 4, 7, 8],
        [3, null, 4, 0, 2, null, null, 8, 7],

        // 7
        // [1, 4, 6, 8],
        [null, 4, null, null, 1, null, 8, null, 6],

        // 8
        // [0, 2, 4, 5, 6, 7]
        [4, null, 5, null, 0, 2, 7, 6, null]
    ]
]
