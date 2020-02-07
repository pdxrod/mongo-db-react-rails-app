class Article
  include Mongoid::Document
  field :name, type: String
  field :content, type: String
  field :classification, type: String
  field :description, type: String
end
