Feature: Homepage
  As a customer
  I want to visit the homepage
  So that I can access the various features on offer

  Scenario: Visit Homepage as anonymous visitor
    Given I am on the homepage
    Then I should see a navbar
    And I should see "This is the website for <business name here>."
    And I should see "Please login to order takeout items from our menu."

  Scenario: Visit Homepage as logged-in customer
    Given I am logged in as customer "client1"
    And I am on the homepage
    Then I should see a navbar
    And I should see "This is the website for <business name here>."
    And I should see "Welcome back, client1!"
