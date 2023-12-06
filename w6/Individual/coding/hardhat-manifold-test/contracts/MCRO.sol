// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title: Mad Crow
/// @author: manifold.xyz

import "./ERC1155Creator.sol";

/////////////////////////
//                     //
//                     //
//            , _ ,    //
//        (\,--,/)     //
//       (\`=' /)      //
//        >-- -<       //
//      / ,'  '. \     //
//     /_/      \_\    //
//        \      /     //
//         `,__,'      //
//                     //
//                     //
/////////////////////////

contract MCRO is ERC1155Creator {
    constructor() ERC1155Creator("Mad Crow", "MCRO") {}
}
