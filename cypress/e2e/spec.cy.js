const url = 'https://travelers-app.netlify.app';
const testCity = "Test - Paris";
const updatedCity = "Test - Paris with snow";
const testNote = "Test - Great trip to Paris :)";
const updatedNote = "Test - Paris was really great with snow!";

describe('Page structure test', () => {
  it('Page loads with structure (navbar, footer, h1 with title)', () => {
    cy.visit(url);
    cy.get('nav').should("be.visible");
    cy.get('footer').should('be.visible');
  })
  it('Navbar contains H1 with the title of the project "ROUTIFY"', () => {
    cy.visit(url);
    cy.get('nav').find('h1').contains('ROUTIFY');
  })
  it('Footer contains a link with the text "Cooperate with us"', () => {
    cy.visit(url);
    cy.get('footer').find('a').contains('Cooperate with us');
  })
})

describe ('Creation of an event', () => {
  it ('In the page "My trips" a button "+" brings us to the form to add a new trip', () => {
    cy.visit(url);
    cy.get('nav').find('a').contains('My trips').click();
    cy.get('.create-trip-card').find('a').click();
    cy.url().should('include', '/add-trip');
  })

  it('The add-trip page contains the form with the correct structure and a submit button', () => {
    cy.visit(url);
    cy.get('nav').find('a').contains('My trips').click();
    cy.get('.create-trip-card').find('a').click();
    
    cy.get('form').should('be.visible');
    cy.get('input[type=text]').should('have.length', 5); //there are 3 inputs of type text
    cy.get('input[type=number]').should('have.length', 2);
    cy.get('.submit-btn').contains('Add Trip').should('be.visible')
  })

  it('Fill out the form, submits it', () => {
    
    cy.visit(url);
    cy.get('nav').find('a').contains('My trips').click();
    cy.get('.create-trip-card').find('a').click();

    cy.get('input[placeholder="Destination"]').type(testCity); // this city has a Test word before, so that can be easily identified
    cy.get('input[placeholder="Price"]').type('200');
    cy.get('input[placeholder="Image Link"]').type('https://www.completefrance.com/wp-content/uploads/2022/04/snow-in-paris-crobard-thinkst.jpg');
    cy.get('input[placeholder="Duration"]').type('5');
    cy.get('input[placeholder="Rating"]').type('3.5');
    cy.get('textarea[placeholder="Notes"]').type(testNote); // this note has a Test word before, so that can be easily identified

    cy.get('input[placeholder="Add new places...↵"]').type('Eiffel tower{enter}');
    cy.get('input[placeholder="Add new places...↵"]').type('Louvre museum{enter}');
    cy.get('input[placeholder="Add new activities...↵"]').type('Paris by night{enter}');
    cy.get('input[placeholder="Add new activities...↵"]').type('Cruise on the Seine River{enter}');

    cy.get('.submit-btn').click();

    cy.url().should('include', 'my-trips'); //after the submission the page is reloaded
    cy.get('.my-trips-list .travel-card').contains(testCity).should('be.visible'); // the submitted travel is added in the reloaded page
  })

  it('Test',() => {
    cy.visit(url);
    cy.get('nav').find('a').contains('My trips').click();
    cy.get('.my-trips-list>.travel-card').contains(testCity).should('be.visible');
  })
})

describe('Edit the created trip', () => {
  it('In the page "My Trips" we can click on the created trip and on the button "Edit"', () => {
    // Identify the created travel
    cy.visit(url);
    cy.get('nav').find('a').contains('My trips').click();
    cy.get('.my-trips-list .travel-card').contains(testCity).click();
    cy.get('.details-container').should('be.visible');

    // Click on edit button
    cy.get('.edit-btn').should('be.visible');
  })

  it('Edit the form', () => {
    cy.visit(url);
    cy.get('nav').find('a').contains('My trips').click();
    cy.get('.my-trips-list .travel-card').contains(testCity).click();
    cy.get('.edit-btn').click();
    cy.url().should('include', 'edit-travel');
    cy.get('form').should('be.visible')

    cy.get('textarea').contains(testNote).clear().type(updatedNote);
    cy.get('input').contains(testCity).clear().type(updatedCity);

    cy.get('.submit-btn').click();
    cy.url().should('include', 'my-trips'); 
    cy.get('.details-container').should('be.visible');
    cy.get('.my-trips-list .travel-card').contains(updatedCity).should('be.visible');
  })
})