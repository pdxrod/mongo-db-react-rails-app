const NewArticle = (props) => {
  let formFields = {}

  return(
    <form onSubmit={ (e) => { props.handleFormSubmit(formFields.classification.value, formFields.name.value); e.target.reset();} }>
      <input ref={input => formFields.classification = input} placeholder='type, e.g. "car"'/>
      <input ref={input => formFields.name = input} placeholder='name'/>
      <button>save</button>
    </form>
  )
}
