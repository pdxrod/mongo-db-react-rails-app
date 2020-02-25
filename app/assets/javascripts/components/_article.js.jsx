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
      let id = this.props.article.id['$oid']
      let attributes = this.props.article.attributes
      let article = attributes
      article["id"] = this.props.article.id
      article.id = this.props.article.id

console.log("handleEdit article ", article)
console.log("handleEdit article id ", article.id)
console.log("handleEdit giving article to handleUpdate ", article)

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
  //  this.props.handleConsole(" render "+this.props.article.attributes.name+" id "+id, false)
    var attrs = Object.keys(attributes).map((key) => {
      let attr = attributes[ key ]

  console.log("render attr ", attr)

      let input_name = "attributes[" + attr + "]"
      let input_id = "attributes_" + attr
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
