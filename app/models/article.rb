class Article
  include ArticlesHelper
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  field :id, type: Integer
  field :name, type: String
  field :classification, type: String

  def add_attr(arg)
    attr = arg.gsub /\s/, '_'
    debug "\n article setting attribute #{attr}"
    self.class.attribute_names << attr
    self.attributes[attr] = ''
    self.class.module_eval { attr_accessor attr.to_sym }
    debug " article now has methods #{self.methods.select{|m| m.to_s.starts_with? attr.to_s}}"
    debug " article now has attributes #{self.attributes.keys.select{|m| m.to_s.starts_with? attr.to_s}}"
  end

end
