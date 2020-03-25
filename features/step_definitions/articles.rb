When(/^I go to the homepage$/) do
  visit root_path
end

Then(/^I should see the introductory message$/) do
  expect(page).to have_content("MongoDB/Rails/React App")
end
