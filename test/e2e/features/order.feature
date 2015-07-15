Feature: Placing an order
  As a customer
  I want to be able to view dish available on a menu
  So that I can add them to my shopping cart and place an order

  Background:
    Given I am on the homepage
    And the following menus exist
      | title   | start_date | end_date   |
      | Monday  | 2015-01-01 | 2015-01-05 |
      | Tuesday | 2015-01-02 | 2015-01-11 |
      # Create "menu_past" - the end_date for the menu is in the past
      # Create "menu_current1" - start_date/end_date span includes the current date
      # Create "menu_current2" - start_date/end_date span includes the current date
      # Create "menu_future" - start_date after the current date
    And the following menu items exist
      # create a menu_items table
      | title         | price |
      | product_name1 | 59.00 |
      | product_name2 | 29.00 |

  Scenario: View the menu
    Given I visit "Menu" page
    Then I should see "menu_current1"
    And I should see "menu_current2"
    And I should not see "menu_past"
    And I should not see "menu_future"
    And I should see "<menu_item name>"  # menu_item in  menu "menu_current1"
    And I should see "<menu_item name>"  # menu_item in  menu "menu_current2"
    And I should not see "<menu_item name>"  # menu_item in  menu "menu_past"
    And I should not see "<menu_item name>"  # menu_item in  menu "menu_future"

  Scenario: Add items to shopping cart
    Given I visit "Menu" page
    Then I should see "menu_current1"
    And I add "product_name1" to the cart
    And I add "product_name2" to the cart
    Then I should see "$88.00 (2 items)"
    When I navigate to my shopping cart
    Then I should see "product_name1" in the shopping cart
    And I should see "product_name2" in the shopping cart
    And I should see "Grand Total: $88.00"
    When I change quantity to "2" for "product_name1"
    Then I should see "Grand Total: $147.00"

  Scenario: Checkout as logged-in customer
    Given I am logged in as customer "client1"
    Given I visit "Menu" page
    Then I should see "menu_current1"
    And I add "product_name1" to the cart
    And I add "product_name2" to the cart
    Then I should see "$88.00 (2 items)"
    When I navigate to my shopping cart
    Then I should see "product_name1" in the shopping cart
    And I should see "product_name2" in the shopping cart
    And I should see "Grand Total: $88.00"
    And I click "Place Order"
    # remaining steps unclear as demo system does not appear to have mocked the
    # "stripe" process .....

  Scenario: Checkout as returning customer
    Given I visit "Menu" page
    Then I should see "menu_current1"
    And I add "product_name1" to the cart
    And I add "product_name2" to the cart
    Then I should see "$88.00 (2 items)"
    When I navigate to my shopping cart
    Then I should see "product_name1" in the shopping cart
    And I should see "product_name2" in the shopping cart
    And I should see "Grand Total: $88.00"
    And I click "Place Order"
    Then I should see "Returning customer? Click here to login"
    And I click "Click here to login"
    And I fill_in "Email" with "john@example.com"
    And I fill_in "Password" with "password"
    And I click "Login"
    Then I should see "Hi, Client"
    And I should see "Summary of your order"
    And I click "Place Order"
    # remaining steps unclear as demo system does not appear to have mocked the
    # "stripe" process .....

  Scenario: Checkout as new customer
  # this scenario would be similar to the above one, except that after the step:
  #  "Then I should see "Returning customer? Click here to login""
  # the test woud continue with the customer registration on that page, then
  # presumably the rest of the scenario would consist of finishing up the order
  # for this newly-registered client
