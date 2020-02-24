const NewArticle = (props) => {
  let formFields = {}

  return(
    <form onSubmit={ (e) => { props.handleFormSubmit(formFields.classification.value, formFields.name.value, formFields.newColumn.value); e.target.reset();} }>
      <div>Add a new article</div>
      <input ref={input => formFields.classification = input} placeholder='type, e.g. car'/>
      <input ref={input => formFields.name = input} placeholder='name'/>
      <div>Add a new column</div>
      <input ref={input => formFields.newColumn = input} placeholder='new column name'/>
      <div><b><button> save </button></b></div>
    </form>
  )
}
