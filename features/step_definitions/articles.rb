When(/^I go to the homepage$/) do
  visit root_path
end

Then(/^I should see the introductory message$/) do
  assert(body.include? "MongoDB/Rails/React App")
end
