Feature: Articles
  As a user
  I want to see the first page
  So that I can enter a new column

  Scenario: User sees the first page
    When I go to the homepage
    Then I should see the introductory message
    And React should be on the page
