const AllArticles = (props) => {

  var articles = props.articles.map((article) => {
  const key = article.id['$oid']

    return(
      <div key={key}>
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
