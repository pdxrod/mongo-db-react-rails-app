class Article
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  
  field :id, type: Integer
  field :name, type: String
  field :classification, type: String

  def add_attr(attr)
    class_eval { attr_accessor attr }
    instance_variable_set "@#{attr}", ""
  end

end
