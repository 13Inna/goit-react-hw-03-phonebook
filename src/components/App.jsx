import { Component } from 'react';
import { v4 as uuidv4 } from "uuid";
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
addContact = ({ name, number }) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
    return true;
    };

 	  componentDidMount() {
	    const contacts = localStorage.getItem('contacts');
	    const parsedContacts = JSON.parse(contacts);
	
	    if (parsedContacts) {
	      this.setState({
	        contacts: parsedContacts});
	    }
	  }
	    
	  componentDidUpdate(prevProps, prevState) {
	    if (this.state.contacts !== prevState.contacts) {
	      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
	    }
    }
  
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
          <Filter value={this.state.filter}  onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
      </div>
    );
  }
}

export default App;
