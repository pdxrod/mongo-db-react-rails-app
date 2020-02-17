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
      let name = this.name.value
      let classification = this.classification.value
      let id = this.props.article.id['$oid']
      let category = this.props.article.classification
      let article = {id: id, classification: classification, name: name}

      this.props.handleConsole("edit article " + name, false)
      this.props.handleUpdate(article)
    } else {
      this.props.handleConsole("edit article ", false)
    }

    this.setState({
      editable: ! this.state.editable
    })

  }

  render(){
    let name = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.article.attributes.name}/>:<b>{this.props.article.attributes.name}</b>
    let classification = this.state.editable ? <input type='text' ref={input => this.classification = input} defaultValue={this.props.article.attributes.classification}/>:<span></span>
    let id = this.props.article.id['$oid']
    let category = <h3>{this.props.article.category}</h3>
  //  this.props.handleConsole(" render "+this.props.article.attributes.name+" id "+id, false)

    return(
      <div>
        {category}
        <ul>
          <span> {classification} </span>
          <span> {name} </span>
          <span> <button onClick={() => this.handleEdit()}>{this.state.editable? 'save' : 'edit'}</button> </span>
          <button onClick={() => this.props.handleDelete(this.props.article)}>delete</button>
        </ul>
      </div>
    )
  }
}
