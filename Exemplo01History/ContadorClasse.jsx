import { Component } from 'react';

export default class ContadorClasse extends Component {
  state = { valor: 0 };

  incrementar = () => {
    this.setState(estado => ({ valor: estado.valor + 1 }));
  };

  render() {
    const { titulo, subtitulo } = this.props;

    return (
      <section>
        <h2>{titulo}</h2>
        <p className="subtitulo">{subtitulo}</p>
        <p>Valor: {this.state.valor}</p>
        <button onClick={this.incrementar}>Incrementar</button>
      </section>
    );
  }
}
