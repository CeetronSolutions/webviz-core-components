// declare global {
//     namespace Cypress {
//         interface Chainable {
//             /**
//              * Custom command to select DOM element by data-cy attribute.
//              * @example cy.dataCy('greeting')
//              */
//             dataCy(value: string): Chainable<Element>;
//         }
//     }
// }

// ./cypress/support/index.js
import "@cypress/react/support";
