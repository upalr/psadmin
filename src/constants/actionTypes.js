"use strict";

// Here you can see all the actions happening in you application

// module.exports = {
//     CREATE_AUTHOR: CREATE_AUTHOR
// };

//USE KEY MIRROR    
var keyMirror = require('react/lib/keyMirror');
module.exports = keyMirror({
    INITIALIZE: null,
    CREATE_AUTHOR: null,
    UPDATE_AUTHOR: null,
    DELETE_AUTHOR: null
});