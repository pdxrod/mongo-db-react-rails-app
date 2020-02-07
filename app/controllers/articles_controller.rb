module OurTextHelper
  def pluralize_upcase(singular)
    the_thing = singular.to_s.upcase
    return the_thing if the_thing == "FRUIT" || the_thing == "SPORT" # It should be SPORT bar not SPORTS bar
    the_thing.pluralize(2).upcase
  end
end

class ArticlesController < ApplicationController
  include OurTextHelper
  before_action :set_article, only: [:show, :edit, :update, :destroy]

  def index
    @articles = Article.all
    items = []
    classifications = []

# This is to make it show classification (e.g. CAR) only once, at the top of the items - see render() in _article.js.jsx
    @articles.each do |article|
      item = {id: article.id, category: pluralize_upcase(article.classification), classification: article.classification, name: article.name, description: article.description}
      if classifications.include? article.classification
        item[:category] = ""
      else
        classifications << article.classification
      end
      items << item
    end
    @articles = items.dup
  end

  def show
  end

  def new
    @article = Article.new
  end

  def edit
  end

  def create
    @article = Article.new(article_params)

    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render :show, status: :created, location: @article }
      else
        format.html { render :new }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @article.update(article_params)
        format.html { redirect_to @article, notice: 'Article was successfully updated.' }
        format.json { render :show, status: :ok, location: @article }
      else
        format.html { render :edit }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @article.destroy
    respond_to do |format|
      format.html { redirect_to articles_url, notice: 'Article was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_article
      @article = Article.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_params
      params.require(:article).permit(:name, :content)
    end
end
