class Articles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewArticle = this.addNewArticle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteArticle = this.deleteArticle.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.updateArticle = this.updateArticle.bind(this)
    this.handleConsole = this.handleConsole.bind(this)
  }

  handleConsole( text, replace ) {
    div = document.getElementById('console') // $('#console') doesn't work - no JQuery in here
    if( replace )
      div.innerText = text
    else
      div.innerText += text
  }

  handleFormSubmit(classification, name, newColumn){
this.handleConsole("handleFormSubmit classification "+classification+ " name "+name+ " newColumn "+newColumn, false)
    let body = JSON.stringify({ })
    if( newColumn )
      body = JSON.stringify({article: {newColumn: newColumn} })
    else
      body = JSON.stringify({article: {classification: classification, name: name} })

    fetch('/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((article)=>{
      this.addNewArticle(article)
    })

  }

  addNewArticle(article){
    this.setState({
      articles: this.state.articles.concat(article)
    })
  }

  handleDelete(article){
    const id = article.id['$oid']
    fetch(`/articles/${id}`,
    {
      method: 'DELETE',
      body: JSON.stringify( {article: {id: id}} ),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.deleteArticle(id)
      })
  }

  deleteArticle(id){
    newArticles = this.state.articles.filter((article) => article.id['$oid'] !== id)
    this.setState({
      articles: newArticles
    })
  }

  handleUpdate(article){
    fetch(`/articles/${article.id['$oid']}`,
    {
      method: 'PUT',
      body: JSON.stringify({article: article}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.updateArticle(article)
      })
  }

  updateArticle(article){
    let newArticles = this.state.articles.filter((f) => f.id['$oid'] !== article.id['$oid'])
    for( i = 0; i < this.state.articles.length; i ++ )
      if( this.state.articles[ i ].id == article.id )
        newArticles.splice(i, 0, article);

    this.setState({
      articles: newArticles
    })
    window.location.reload()
  }

  componentDidMount(){
    fetch('/articles.json')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
    //    this.handleConsole( "response: "+JSON.stringify(data), false)
        this.setState({ articles: data })
      });
  }

  render(){
    return(
      <div>
        <AllArticles articles={this.state.articles} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}
                                              handleConsole={this.handleConsole}/>

        <NewArticle handleFormSubmit={this.handleFormSubmit}/>
      </div>
    )
  }
}