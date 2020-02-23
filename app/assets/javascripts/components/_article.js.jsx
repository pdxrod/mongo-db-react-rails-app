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
  //    let article = {id: id, ...attributes}
      let article = attributes
      article["id"] = id

console.log("handleEdit article ", article)

  //    this.props.handleUpdate(article)
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

  console.log("render article ", attr)


      let attribute = this.state.editable ? <input type='text' ref={input => attr = input} defaultValue={attr}/> : <b>{attr}</b>

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
          <span> <button onClick={() => this.handleEdit()}>{this.state.editable? 'save' : 'edit'}</button> </span>
          <button onClick={() => this.props.handleDelete(this.props.article)}>delete</button>
        </ul>
      </div>
    )
  }
}
