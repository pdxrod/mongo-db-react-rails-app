Feature: UpperCaseInput

Scenario: shows the value in UPPERCASE
  When rendering <UpperCaseInput value="Simpson" />
  Then the input has props.value equal to "SIMPSON"
  
