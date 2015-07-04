Feature: Placing an order
  As a customer
  I want to be able to view dish available on a menu
  So that I can add them to my shopping cart and place an order

  Scenario: View the menu
    Given I am on the homepage
    When I click 'Menu'
    Then I should see the menu

  Scenario: Add items to shopping cart
    Given the following menu exist
      # Create a menu here
    When I am on the menu page
    Then I should see "Menu Title"
    When I add an "Product name" to the cart
    And I navigate to my shopping cart
    Then I should see "Product name" in the shopping cart

  Scenario: Checkout
    # List steps here
