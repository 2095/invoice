import React from 'react';
import './terminal-page.css';
import {connect} from 'react-redux';
import {addNewTerminal, setNewTerminal, setNewDescription, increaseTerminalID, setTerminalListToNull} from '../../redux/actions';


const mapStateToProps = (state) => {
    return {
        terminalList: state.terminalList,
        newTerminal: state.newTerminal,
        newDescription: state.newDescription,
        terminalID: state.terminalID
      }};

const mapDispatchToProps = (dispatch) => {
    return {
        addNewTerminal: (payload) => dispatch(addNewTerminal(payload)),
        setNewTerminal: (payload) => dispatch(setNewTerminal(payload)),
        setNewDescription: (payload) => dispatch(setNewDescription(payload)),
        increaseTerminalID: () => dispatch(increaseTerminalID()),
        setTerminalListToNull: () => dispatch(setTerminalListToNull())
        }};

class TerminalPage extends React.Component {

    terminalChange = (e) => {
        this.props.setNewTerminal(e.target.value)
    }

    descriptionChange = (e) => {
        this.props.setNewDescription(e.target.value)
    }

    addTerminal(){
        this.props.addNewTerminal({id: this.props.terminalID, name: this.props.newTerminal, description: this.props.newDescription})
        this.props.increaseTerminalID()
        this.props.setNewTerminal('')
        this.props.setNewDescription('')
    }

    deleteContact(id){
        this.props.setTerminalListToNull();

        const idx = this.props.terminalList.findIndex((el) => el.id === id);
        const newArray = [...this.props.terminalList.slice(0, idx),...this.props.terminalList.slice(idx+1)];

        for (let obj in newArray){
            this.props.addNewTerminal(newArray[obj])
          }
    }

    render() {
      return(
        <div className="contactPage">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Название терминала</th>
                        <th scope="col">Описание</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.terminalList.map(item => {
                    return(
                        <tr key={item.id}>
                        <th scope="row">{item.name}</th>
                            <td>{item.description}
                            <button type='button' className='btn btn-outline-danger btn-sm float-right' 
                            onClick={()=>this.deleteContact(item.id)}>
                            <i className="fa fa-trash-o" /></button></td>
                        </tr>
                        )})}
                </tbody>
            </table>
            <form className='contact-add-form d-flex'>
            <input type='text' className='form-control add' placeholder="Название терминала" value={this.props.newTerminal}
                onChange={this.terminalChange}/>
            <input type='text' className='form-control add' placeholder="Описание терминала" value={this.props.newDescription}
                onChange={this.descriptionChange}/>
            <button type='button' className='btn btn-outline-primary add' onClick={() => this.addTerminal()}>Добавить</button>
            </form>
        </div>
      )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(TerminalPage);