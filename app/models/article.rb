class Article
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  field :id, type: Integer
  field :name, type: String
  field :classification, type: String

  def add_attr(attr)
puts "\n article setting attribute #{attr}"
    self.class.module_eval { attr_accessor attr.to_sym }
    eval "@#{attr} = ''"
puts "\n article now has methods #{self.methods.select{|m| m.to_s.starts_with? attr}}"
  end

end
