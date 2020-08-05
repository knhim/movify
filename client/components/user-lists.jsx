import React from 'react';
import ListCard from './list-card';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class UserLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false, text: '' };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUserLists();
  }

  toggleModal() {
    this.setState((prevState, props) => { return { modalShow: !prevState.modalShow }; });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.toggleModal();
    this.props.createNewList(this.state.text);
    this.setState({ text: '' });
  }

  handleText(event) {
    this.setState({ text: event.target.value });
  }

  render() {

    return (<>
      <div className="container mt-2 justify-content-center">
        <h1>My Lists</h1>
        <div>
          <Button color="primary" onClick={() => this.toggleModal()}>Create a Custom List  +</Button>
          <Modal isOpen={this.state.modalShow} toggle={() => this.toggleModal()} >
            <ModalHeader toggle={() => this.toggleModal()}>What is the name of your new list?</ModalHeader>
            <ModalBody>
              <form className="container">
                <input onChange={this.handleText} value={this.state.text} className="form-control" placeholder="Name of new list" id="listName"></input>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.handleSubmit(event)}>Create new list</Button>{' '}
              <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        {this.props.lists.map(item => (
          <ListCard key={item.listId} id={item.listId} item={item} deleteList={this.props.deleteList} changeView={this.props.changeView} />
        ))}
      </div>

    </>);
  }
}
