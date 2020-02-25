module OurTextHelper
  def pluralize_upcase(singular)
    the_thing = singular.to_s.upcase
    return the_thing if the_thing == "FRUIT" || the_thing == "SPORT" # It should be SPORT bar not SPORTS bar
    the_thing.pluralize(2).upcase
  end
end

class NilClass
  def empty? ; true ; end
end

class ArticlesController < ApplicationController
  include ArticlesHelper
  include OurTextHelper

  def index
    @articles = Article.all
    items = []
    classifications = []

# This is to make it show classification (e.g. CARS) only once, at the top of the items - see render() in _article.js.jsx
    @articles.each do |article|
      attributes = article.attributes.except :_id
      category = article.classification
      item = {id: article.id, category: pluralize_upcase( category ), attributes: attributes}
      category = "OTHER" if category.empty?
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
    newColumn = args.delete :newColumn
  debug "\ncreate article new column is '#{newColumn}'"
    if( newColumn )

  debug "\ncreate article adding new column #{args}"

      @article = Article.new
      @article.add_attr newColumn
      @article.update_attributes(args)
  debug "\ncreate article attributes #{@article.attributes}"

    else

  debug "\ncreate article without new column #{args}"
      @article = Article.create(args)
    end
    render json: @article
  end

  def update
    debug "\nupdate article #{article_params}"


    @article = Article.find(article_params[:id])
    @article.update_attributes(article_params)
    render json: @article
  end

  def destroy
    @article = Article.find(article_params[:id])

    @article.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def article_params
      params.require(:article).permit(:name, :classification, :id, :category, :newColumn)
    end
end
