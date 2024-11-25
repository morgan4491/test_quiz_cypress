import React from 'react';
import { mount } from 'cypress/react18';
import Quiz from '../../src/components/Quiz';

describe('<Quiz />', () => {
  it('should display questions and handle answers correctly', () => {
    // Intercept the API call and return mockQuestions
    cy.fixture('questions.json').then((mockQuestions) => {
      // Intercept the API call and return mockQuestions
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: mockQuestions,
      }).as('getQuestions');

      // Mount the Quiz component
      mount(<Quiz />);

      // Should have a button with 'Start Quiz' as text once the component loads
      cy.get('button').should('contain.text', 'Start Quiz');

      // Start the quiz
      cy.get('button').contains('Start Quiz').click();

      // Wait for the API call to complete
      cy.wait('@getQuestions');

      // TODO: Complete the test code to answer both mock questions and ensure the score is correct at the end of the quiz

      // Make sure there is a div element with a class of 'card' when the first question pops up
      cy.get('div.card');

      // Confirm h2 element with text of 'What does the method append() do in a list?'
      cy.get('h2').contains('What does the method append() do in a list?');

      // Make sure all answers are displayed properly
      cy.get('button').contains('1');
      cy.get('button').contains('2');
      cy.get('button').contains('3');
      cy.get('button').contains('4');
      cy.get('div').contains('Adds a new element at the end of the list');
      cy.get('div').contains('Removes the last element of the list');
      cy.get('div').contains('Sorts the list in ascending order');
      cy.get('div').contains('Removes all elements from the list');

      // Find the button with text of '1' and click() to answer the first mock question
      cy.get('button').contains('1').click();

      // Make sure there is a div element with a class of 'card' when the first question pops up
      cy.get('div.card');

      // Confirm h2 element with text of 'What does the method append() do in a list?'
      cy.get('h2').contains('How do you create a tuple in Python?');

      // Make sure all answers are displayed properly
      cy.get('button').contains('1');
      cy.get('button').contains('2');
      cy.get('button').contains('3');
      cy.get('button').contains('4');
      cy.get('div').contains('[]');
      cy.get('div').contains('{}');
      cy.get('div').contains('()');
      cy.get('div').contains('tuple[]');


      // Find the button with text of '3' and click() to answer the second mock question
      cy.get('div button').contains('3').click();

      // Find the 'Quiz Completed' text after the last mock question is answered
      cy.get('h2').contains('Quiz Completed');

      // Find the score and make sure correct
      cy.get('div').contains('2/2');

      // Find the 'Take New Quiz' button and click it
      cy.get('button').contains('Take New Quiz')

    });
  });
});