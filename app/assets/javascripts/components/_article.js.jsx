class Article extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      editable: false
    }
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit(){
   if(this.state.editable) {
      let article = this.props.article.attributes
      article.id = this.props.article.id
      id = article.id['$oid']

      Object.keys(article).map((key) => {
        let input_id = "article_" + id + "_" + key
        let attr = document.getElementById( input_id )
        if( attr ) {
          article[ key ] = attr.value
        }
      })

      this.props.handleUpdate(article)
    } else {
      this.props.handleConsole("edit article ", false)
    }

    this.setState({
      editable: ! this.state.editable
    })

  }

  render(){
    let id = this.props.article.id['$oid']
    let category = <h3>{this.props.article.category}</h3>
    let attributes = this.props.article.attributes
    delete attributes[ 'id' ]
    delete attributes[ 'category' ]

    var attrs = Object.keys(attributes).map((key) => {
      let attr = attributes[ key ]

      if( ! attr ) {
        return(
          <div key={key}></div>
        )
      }

      let input_name = "article_" + id + "[" + key + "]"
      let input_id = "article_" + id + "_" + key
      let attribute = this.state.editable ?
          <input type='text' name={input_name} id={input_id} defaultValue={attr}/> :
          <b>{attr}</b>

      return(
        <div key={key}>
          <span> {key} </span><span> {attribute} </span>
        </div>
      )
    })

    return(
      <div>
        {category}
        <ul>
          {attrs}
          <span> <button onClick={() => this.handleEdit()}>{this.state.editable ? 'save' : 'edit'}</button> </span>
          <button onClick={() => this.props.handleDelete(this.props.article)}>delete</button>
        </ul>
      </div>
    )
  }
}
