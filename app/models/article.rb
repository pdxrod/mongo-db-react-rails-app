class Article
  include Mongoid::Document
  field :id, type: Integer
  field :name, type: String
  field :classification, type: String
end
