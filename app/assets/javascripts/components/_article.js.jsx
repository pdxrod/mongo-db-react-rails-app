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

      let input_id = "article_" + id + "_newColumn"
      let attr = document.getElementById( input_id )
      if( attr ) {
        val = attr.value.trim()
        if( val )
          article[ 'newColumn' ] = val
      }

      this.props.handleUpdate(article)
    }

    this.setState({
      editable: ! this.state.editable
    })

  }

  render(){
    let id = this.props.article.id['$oid']
    let category = <h3>{this.props.article.category}</h3>
    let attributes = this.props.article.attributes
    if( ! attributes ) attributes = this.props.article

    var attrs = Object.keys(attributes).map((key) => {
      if( 'id' == key || 'category' == key )
        return('')

      let attr = attributes[ key ]
      let input_name = "article_" + id + "[" + key + "]"
      let input_id = "article_" + id + "_" + key
      let attribute = this.state.editable
          ? <input type='text' name={input_name} id={input_id} defaultValue={attr}/>
          : <b>{attr}</b>

      return(
        <div key={key}>
          <span> {key} </span><span> {attribute} </span>
        </div>
      )
    })

    let key = this.state.editable ? 'newColumn' : ''
    let name = this.state.editable ? 'new column' : ''
    let input_name = "article_" + id + "[" + 'newColumn' + "]"
    let input_id = "article_" + id + "_" + 'newColumn'

    let attribute = this.state.editable
        ? <input type='text' name={input_name} id={input_id} placeholder='new column name' defaultValue=' '/>
        : <b></b>
    let newColumn =
        <span key={key}>
          <span> {name} </span><span> {attribute} </span>
        </span>

    attrs = Array.prototype.concat( attrs, newColumn )

    return(
      <div>
        {category}
        <ul>
          {attrs}
          <span> {this.state.editable ? <br /> : <b></b>} </span>
          <span> <button onClick={() => this.handleEdit()}>{this.state.editable ? 'save' : 'edit'}</button> </span>
          <button onClick={() => this.props.handleDelete(this.props.article)}>delete</button>
        </ul>
      </div>
    )
  }
}
