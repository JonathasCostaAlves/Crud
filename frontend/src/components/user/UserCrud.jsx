import React, {Component} from "react";
import Main from '../template/Main'

import axios from 'axios'

const headerProps = {
    icon:'users',
    title:"Usuários",
    subtitle:'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl ='http://localhost:3001/users'

const initialState = {
    user:{name:'', email:''},
    list:[]
}

export default class UserCrud extends Component{
    state = {...initialState}

    componentWillMount(){
        axios(baseUrl).then(resp => this.setState({list: resp.data})).catch(err => console.log(err))
    }

    clear(){
        this.setState({user: initialState.user})
    }
    save(){
        const user = this.state.user
        const method = user.id ? 'put' :'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdateLista(resp.data)
                this.setState({user: initialState.user, list})
            })
            .catch(error => console.log(error))
    }

    getUpdateLista(user, add=true){
        const list = this.state.list.filter(users => users.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name]= event.target.value 
        this.setState({user})
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Nome</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome ..."
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="">E-mail</label>
                            <input type="text"
                                className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail ..."
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <button className="btn btn-primary ml-2" 
                            onClick={e => this.save(e)}
                            >
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}
                        >
                            cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({user})
    }
    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp=> {
            const list = this.getUpdateLista(user, false)
            this.setState({ list })
        })
    }
    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <th>ID</th>                    
                    <th>Nome</th>                    
                    <th>E-mail</th>                    
                    <th>Ações</th>                    
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="d-flex justify-content-end">
                        <button className="btn btn-warning"
                        onClick={()=>this.load(user)}
                        >
                            <i className="fa fa-pencil"></i>
                        </button>

                        <button className="btn btn-danger ml-2"
                        onClick={()=>this.remove(user)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                        
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
                    )
    }
}