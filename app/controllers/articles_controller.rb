module OurTextHelper
  def pluralize_upcase(singular)
    the_thing = singular.to_s.upcase
    return the_thing if ["OTHER", "FRUIT", "SPORT"].include? the_thing # It should be SPORT bar not SPORTS bar
    the_thing.pluralize(2).upcase
  end
end

class String
  def random
    str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').shuffle[0..5].join
    str.downcase! if( rand( 0..5 ) > 0 )
    str
  end
end

class NilClass
  def empty? ; true ; end
end

class ArticlesController < ApplicationController
  include ArticlesHelper
  include OurTextHelper

  def index
    @articles = Article.all.sort{ |a, b| a.classification  <=>  b.classification }
    items = []
    classifications = []

# This is to make it show classification (e.g. CARS) only once, at the top of the items - see render() in _article.js.jsx
    @articles.each do |article|
      attributes = article.attributes.except :_id
      attributes[:classification] = "other" if attributes[:classification].empty?
      category = article.classification
      item = {id: article.id, category: pluralize_upcase( category ), attributes: attributes}
      if classifications.include? category
        item[:category] = ""
      else
        classifications << category
      end
      items << item
    end
    @articles = items.dup
    debug "\narticles index #{@articles}"
    render json: @articles
  end

  def create
    args = article_params.dup
    args[:name] = ''.random if args[:name].empty?
    args[:classification] = 'other' if args[:classification].empty?
    newColumn = (args.delete :newColumn).to_s.strip
    debug "\ncreate article new column is '#{newColumn}'"

    if( newColumn.empty? )
      debug "\ncreate article without new column #{args}"
      @article = Article.create(args)
    else

      debug "\ncreate article #{args} adding new column '#{newColumn}'"
      @article = Article.new
      @article.add_attr newColumn
      @article.update_attributes(args)
      @article.save!
      debug "\ncreate article attributes #{@article.attributes}"

    end
    render json: @article
  end

  def update
    args = article_params.dup
    debug "\nupdate article #{args}"
    @article = Article.find(args[:id]["$oid"])
    debug "@article #{@article.attributes}"
    debug "Recreating article #{args[:id]}"
    @article.destroy
    @article = Article.new
    args.each do |k, v|
      @article.add_attr k unless ['id', 'name', 'classification'].include? k.to_s
    end
    args.each do |k, v|
      debug "setting '#{k}' to '#{v}'" unless k.to_s == 'id'
      @article.attributes[ k ] = "#{ v }" unless k.to_s == 'id'
    end
    @article.update_attributes(args)
    @article.save!
    debug "\n"

    render json: @article
  end

  def destroy
    @article = Article.find(article_params[:id])
    @article.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def add_param(param)
    class << self
      def article_params
        params.require(:article).permit(:name, :classification, :id, :category, :newColumn, param)
      end
    end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def article_params
    params.require(:article).permit!
  end
end
