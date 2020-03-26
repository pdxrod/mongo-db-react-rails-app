Feature: Article
  As a user
  I want to see an article

  Scenario: Render article
    When rendering <Article category="car" />
    Then the 1st p has text equal to "CARS"
