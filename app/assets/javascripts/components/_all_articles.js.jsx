const AllArticles = (props) => {

  var articles = props.articles.map((article) => {
    return(
      <div key={article.id}>
       <Article article={article} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}
                            handleConsole={props.handleConsole}
       />
      </div>
    )
  })

  return(
      <div>
        {articles}
      </div>
    )
}
