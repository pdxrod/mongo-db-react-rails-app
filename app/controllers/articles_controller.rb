module OurTextHelper
  def pluralize_upcase(singular)
    the_thing = singular.to_s.upcase
    return the_thing if the_thing == "FRUIT" || the_thing == "SPORT" # It should be SPORT bar not SPORTS bar
    the_thing.pluralize(2).upcase
  end
end

class ArticlesController < ApplicationController
  include OurTextHelper

  def index
    @articles = Article.all
    items = []
    classifications = []

# This is to make it show classification (e.g. CARS) only once, at the top of the items - see render() in _article.js.jsx
    @articles.each do |article|
      attributes = article.attributes.except :_id
      item = {id: article.id, category: pluralize_upcase(article.classification), attributes: attributes}
      if classifications.include? article.classification
        item[:category] = ""
      else
        classifications << article.classification
      end
      items << item
    end
    @articles = items.dup
puts "\narticles index #{@articles}"
    render json: @articles
  end

  def create
    newColumn = article_params[:newColumn]
    article_params.delete :newColumn 
    if( newColumn )
  puts "\ncreate article adding new column #{article_params}"
      @article = Article.create(article_params)
      @article.add_attr newColumn
  puts "\ncreate article new column #{newColumn} = '" + eval("@article.#{newColumn}") + "'"
    else
  puts "\ncreate article without new column #{article_params}"
      @article = Article.create(article_params)
    end
    render json: @article
  end

  def update
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
