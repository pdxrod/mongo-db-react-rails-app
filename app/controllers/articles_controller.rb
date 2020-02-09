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

# This is to make it show classification (e.g. CAR) only once, at the top of the items - see render() in _article.js.jsx
    @articles.each do |article|

      item = {id: article.id, category: pluralize_upcase(article.classification), classification: article.classification, name: article.name}
      if classifications.include? article.classification
        item[:category] = ""
      else
        classifications << article.classification
      end
      items << item
    end
    @articles = items.dup

    render json: @articles
  end

  def create
    @article = Article.create(article_params)
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
      params.require(:article).permit(:name, :classification, :id, :category)
    end
end
