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
      let category = this.props.article.category
      let description = this.description.value
      let id = this.props.article.id
      let article = {id: id, classification: classification, name: name, description: description}
      this.props.handleConsole("Edit article " + name, false)
      this.props.handleUpdate(article)
    } else {
      this.props.handleConsole("Edit article ", true)
    }

    this.setState({
      editable: ! this.state.editable
    })

  }

  render(){
    let name = this.state.editable ? <input type='text' ref={input => this.name = input} defaultValue={this.props.article.name}/>:<b>{this.props.article.name}</b>
    let description = this.state.editable ? <input type='text' ref={input => this.description = input} defaultValue={this.props.article.description}/>:<p>{this.props.article.description}</p>
    let classification = this.state.editable ? <input type='text' ref={input => this.classification = input} defaultValue={this.props.article.classification}/>:<span></span>
    let category = <h3>{this.props.article.category}</h3>

    this.props.handleConsole(" render "+this.props.article.name)

    return(
      <div>
        {category}
        <ul>
          {classification}
          {name}
          {description}
          <button onClick={() => this.handleEdit()}>{this.state.editable? 'Submit' : 'Edit'}</button>
          <button onClick={() => this.props.handleDelete(this.props.article.id)}>Delete</button>
        </ul>
      </div>
    )
  }
}
