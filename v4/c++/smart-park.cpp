#include <iostream>
#include <vector>
#include <string>

class Veiculo {
private:
    std::string placa;
    std::string tipo;
    std::string marca;
    int ano;

public:
    Veiculo(std::string placa, std::string tipo, std::string marca, int ano) {
        this->placa = placa;
        this->tipo = tipo;
        this->marca = marca;
        this->ano = ano;
    }

    std::string pegarPlaca() {
        return placa;
    }

    std::string pegarTipo() {
        return tipo;
    }
};

class Cliente {
private:
    std::string cpf;
    std::string nome;
    bool deficiente;
    bool cadastro;
    Veiculo veiculo;
    int minutoEntrada;
    int minutoSaida;

public:
    Cliente(std::string id, std::string n, bool d, bool c, Veiculo v)
        : cpf(id), nome(n), deficiente(d), cadastro(c), veiculo(v), minutoEntrada(0), minutoSaida(0) {}

    Veiculo pegarVeiculo() {
        return veiculo;
    }

    std::string pegarCPF() {
        return cpf;
    }

    std::string pegarNome() {
        return nome;
    }

    bool eDeficiente() {
        return deficiente;
    }

    bool eCadastrado() {
        return cadastro;
    }

    void definirHorarioEntrada(int entrada) {
        minutoEntrada = entrada;
    }

    void definirHorarioSaida(int saida) {
        minutoSaida = saida;
    }

    int pegarHorarioEntrada() {
        return minutoEntrada;
    }

    int pegarHorarioSaida() {
        return minutoSaida;
    }
};

class ComprovanteEstacionamento {
private:
    Cliente* cliente; 
    float custo;

    float calcularCusto(float minutos) {
        const float tarifaPor30Minutos = 3.0;
        float custoBase = (minutos / 30) * tarifaPor30Minutos;
        if (cliente->eCadastrado()) {
            custoBase *= 0.9;
        }
        if (cliente->eDeficiente()) {
            custoBase *= 0.8;
        }
        return custoBase;
    }

public:
    ComprovanteEstacionamento(Cliente* c)
        : cliente(c) {
        float minutos = cliente->pegarHorarioSaida() - cliente->pegarHorarioEntrada();
        custo = calcularCusto(minutos);
    }

    std::string pegarPlacaVeiculo() {
        return cliente->pegarVeiculo().pegarPlaca();
    }

    std::string pegarTipoVeiculo() {
        return cliente->pegarVeiculo().pegarTipo();
    }

    std::string pegarTipoUsuario() {
        return cliente->eCadastrado() ? "Cadastrado" : "Não Cadastrado";
    }

    std::string pegarNome() {
        return cliente->pegarNome();
    }

    std::string pegarCPF() {
        return cliente->pegarCPF();
    }

    float pegarTempoTotal() {
        return cliente->pegarHorarioSaida() - cliente->pegarHorarioEntrada();
    }

    float pegarCusto() {
        return custo;
    }

    int pegarHorarioEntrada() {
        return cliente->pegarHorarioEntrada();
    }

    int pegarHorarioSaida() {
        return cliente->pegarHorarioSaida();
    }
};

class Vaga {
private:
    bool ocupada;

public:
    Vaga() : ocupada(false) {}

    bool eOcupada() {
        return ocupada;
    }

    void ocupar() {
        ocupada = true;
    }
};

class Estacionamento {
private:
    std::vector<Vaga*> vagas;

public:
    Estacionamento(int totalVagas) {
        for (int i = 0; i < totalVagas; ++i) {
            vagas.push_back(new Vaga());
        }
    }

    void selecionarVaga(int numeroVaga) {
        if (vagas[numeroVaga - 1]->eOcupada()) {
            std::cout << "A vaga já está ocupada.\n";
        } else {
            vagas[numeroVaga - 1]->ocupar();
            std::cout << "Vaga " << numeroVaga << " ocupada com sucesso.\n";
        }
    }

    std::vector<Vaga*> pegarVagas() {
        return vagas;
    }
};

class BancoDados {
private:
    std::vector<ComprovanteEstacionamento*> registros;

public:
    void adicionarRegistro(ComprovanteEstacionamento* registro) {
        registros.push_back(registro);
    }

    std::vector<ComprovanteEstacionamento*> pegarRegistros() {
        return registros;
    }
};

class Controlador {
private:
    BancoDados* bancoDados;
    Estacionamento* estacionamento;

public:
    Controlador(BancoDados* bancoDados, Estacionamento* estacionamento) {
        this->bancoDados = bancoDados;
        this->estacionamento = estacionamento;
    }

    void registrarVeiculo(std::string placa, std::string tipoVeiculo, std::string marca, int ano, std::string cpf, std::string nome, bool deficiente, bool cadastrado, int minutoEntrada, int minutoSaida, int numeroVaga) {
        Veiculo veiculo(placa, tipoVeiculo, marca, ano);
        Cliente* cliente = new Cliente(cpf, nome, deficiente, cadastrado, veiculo);
        cliente->definirHorarioEntrada(minutoEntrada);
        cliente->definirHorarioSaida(minutoSaida);

        ComprovanteEstacionamento* comprovante = new ComprovanteEstacionamento(cliente);

        estacionamento->selecionarVaga(numeroVaga);
        bancoDados->adicionarRegistro(comprovante);
    }

    void exibirRegistros() {
        const auto& registros = bancoDados->pegarRegistros();
        for (int i = 0; i < registros.size(); ++i) {
            const auto& registro = registros[i];
            std::cout << "Nome: " << registro->pegarNome() << " pertencente ao CPF: " << registro->pegarCPF() << std::endl;
            std::cout << "Detentor do veículo de placa: " << registro->pegarPlacaVeiculo() << std::endl;
            std::cout << "sendo esse veículo um(a) " << registro->pegarTipoVeiculo() << std::endl;
            std::cout << "Tipo do usuário: " << registro->pegarTipoUsuario() << std::endl;
            std::cout << "Tempo total: " << registro->pegarTempoTotal() << " minutos" << std::endl;
            std::cout << "Custo: R$ " << registro->pegarCusto() << std::endl;
            std::cout << "Horário de entrada: " << registro->pegarHorarioEntrada() << " minutos" << std::endl;
            std::cout << "Horário de saída: " << registro->pegarHorarioSaida() << " minutos" << std::endl;
        }
    }

    void exibirVagas() {
        const auto& vagas = estacionamento->pegarVagas();
        std::cout << "Mapa de Vagas:\n";
        for (int i = 0; i < vagas.size(); ++i) {
            if (i % 5 == 0 && i != 0) {
                std::cout << "\n";
            }
            if (vagas[i]->eOcupada()) {
                std::cout << "X ";
            } else {
                std::cout << i + 1 << " ";
            }
        }
        std::cout << "\n";
    }
};


class Interface {
private:
    Controlador* controlador;

public:
    Interface(Controlador* controlador) {
        this->controlador = controlador;
    }
    void executar() {
        std::string placa;
        std::string tipoVeiculo;
        std::string marca;
        int ano;

        std::cout << "Digite a placa do veículo: ";
        std::cin >> placa;

        std::cout << "Digite o tipo do veículo (Carro ou Moto): ";
        std::cin >> tipoVeiculo;

        std::cout << "Digite a marca do veículo: ";
        std::cin >> marca;

        std::cout << "Digite o ano do veículo: ";
        std::cin >> ano;

        std::string cpf;
        std::string nome;
        int deficienteInput;
        int cadastroInput;
        int minutoEntrada;
        int minutoSaida;
        int numeroVaga;

        std::cout << "Digite o CPF do cliente: ";
        std::cin >> cpf;

        std::cout << "Digite o nome do cliente: ";
        std::cin >> nome;
        
        std::cout << "O cliente é deficiente? Digite 1 para sim e 2 para não: ";
        std::cin >> deficienteInput;
        bool deficiente = deficienteInput == 1 ? true : false;

        std::cout << "O cliente é cadastrado? Digite 1 para sim e 2 para não: ";
        std::cin >> cadastroInput;
        bool cadastrado = cadastroInput == 1 ? true : false;

        std::cout << "Digite o horário de entrada em minutos: ";
        std::cin >> minutoEntrada;

        std::cout << "Digite o horário de saída em minutos: ";
        std::cin >> minutoSaida;

        controlador->exibirVagas();
        std::cout << "\nEscolha uma vaga (1 a 20): ";
        std::cin >> numeroVaga;

        controlador->registrarVeiculo(placa, tipoVeiculo, marca, ano, cpf, nome, deficiente, cadastrado, minutoEntrada, minutoSaida, numeroVaga);
        std::cout << "Registro efetuado com sucesso.\n";
        controlador->exibirVagas();
        controlador->exibirRegistros();
    }
};

int main() {
    BancoDados* bancoDados = new BancoDados();
    Estacionamento* estacionamento = new Estacionamento(20);
    Controlador* controlador = new Controlador(bancoDados, estacionamento);

    Interface interface(controlador);
    interface.executar();



    return 0;
}
