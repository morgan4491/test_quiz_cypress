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

      // Start the quiz
      cy.get('button').contains('Start Quiz').click();

      // Wait for the API call to complete
      cy.wait('@getQuestions');

      // TODO: Complete the test code to answer both mock questions and ensure the score is correct at the end of the quiz

      // Find the button with text of '1' and click() to answer the first mock question
      cy.get('div button').contains('1').click();

      // Find the button with text of '3' and click() to answer the second mock question
      cy.get('div button').contains('3').click();

      // Find the 'Quiz Completed' text after the last mock question is answered
      cy.get('h2').contains('Quiz Completed');

      // Find the score and make sure correct
      cy.get('div').contains('2/2');

      // Find the 'Take New Quiz' button and click it
      // cy.get('button').contains('Take New Quiz').click();
      
    });
  });
});