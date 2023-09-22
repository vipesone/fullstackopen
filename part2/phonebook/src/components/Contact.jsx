const Contact = ({contact, handleContactClick}) => {
  return (
    <div>{contact.name} {contact.number} <button onClick={handleContactClick}>delete</button></div>
  )
}

export default Contact
