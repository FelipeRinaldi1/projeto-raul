import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { vagasCarro, vagasMoto } from "./data";
import { useState } from "react";

interface INotaFiscal {
 nome: string;
 cpf: string;
 placaVeiculo: string;
 tipoVeiculo: string;
 marcaVeiculo: string;
 cadastro: boolean;
 horarioEntrada: string;
 horarioSaida: string;
 anoDoVeiculo: string;
 tempoTotal: number;
 custo: number;
}

function App() {
 const [placa, setPlaca] = useState("");
 const [nome, setNome] = useState("");
 const [marcaVeiculo, setMarcaVeiculo] = useState("");
 const [horarioEntrada, setHorarioEntrada] = useState("");
 const [cadastro, setCadastro] = useState(false);
 const [deficiente, setDeficiente] = useState(false);
 const [horarioSaida, setHorarioSaida] = useState("");
 const [tipoDoVeiculo, setTipoDoVeiculo] = useState("");
 const [anoDoVeiculo, setAnoDoVeiculo] = useState("");
 const [cpf, setCpf] = useState("");
 const [listaNotaFiscal, setListaNotaFiscal] = useState<INotaFiscal[]>([]);

 const [_vagasCarro, setVagasCarro] = useState(vagasCarro);
 const [vagaSelecionadaCarro, setVagaSelecionadaCarro] = useState<number>(-1);

 const [_vagasMoto, setVagasMoto] = useState(vagasMoto);
 const [vagaSelecionadaMoto, setVagaSelecionadaMoto] = useState<number>(-1);

 const ocuparVagaCarro = (id: number) => {
  const vagas = [..._vagasCarro];
  vagas[id].ocupada = !vagas[id].ocupada;
  setVagasCarro(vagas);
  console.log(id);
 };

 const ocuparVagaMoto = (id: number) => {
  const vagas = [..._vagasMoto];
  vagas[id].ocupada = !vagas[id].ocupada;
  setVagasMoto(vagas);
 };

 function Custo(
  horarioSaida: number,
  horarioEntrada: number,
  cadastrado: boolean,
  deficiente: boolean
 ): number {
  const tarifaBase = 3;
  const tempoTotal = horarioSaida - horarioEntrada;

  const blocos30Minutos = Math.ceil(tempoTotal / 30);

  let custo = blocos30Minutos * tarifaBase;

  if (deficiente) {
   custo *= 0.8;
  } else if (cadastrado) {
   custo *= 0.9;
  }

  return parseFloat(custo.toFixed(2));
 }

 const handleOnSubmit = () => {
  const custoCalculado = Custo(
   Number(horarioSaida),
   Number(horarioEntrada),
   cadastro,
   deficiente
  );

  if (tipoDoVeiculo === "Carro") {
   ocuparVagaCarro(vagaSelecionadaCarro);
  } else {
   ocuparVagaMoto(vagaSelecionadaMoto);
  }

  setListaNotaFiscal([
   {
    nome: nome,
    cpf: cpf,
    placaVeiculo: placa,
    tipoVeiculo: tipoDoVeiculo,
    marcaVeiculo: marcaVeiculo,
    cadastro: cadastro,
    horarioEntrada: horarioEntrada,
    horarioSaida: horarioSaida,
    tempoTotal: Number(horarioSaida) - Number(horarioEntrada),
    anoDoVeiculo: anoDoVeiculo,
    custo: custoCalculado,
   },
  ]);

  console.log(cadastro, "cadastro");
 };
 console.log("aqui", listaNotaFiscal);

 return (
  <div className="bg-gradient-to-r from-gray-500 to-gray-700 min-h-screen w-full flex flex-col items-center p-8">
   {/* Sessão Superior */}
   <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
    <div className="grid grid-cols-2 gap-8">
     {/* Coluna 1 */}
     <div className="flex flex-col gap-4">
      <div>
       <h3 className="text-lg font-semibold text-white">Usuário Cadastrado?</h3>
       <div className="flex gap-4 mt-2">
        <Button
         className="bg-green-500 hover:bg-green-600"
         onClick={() => setCadastro(true)}
        >
         Sim
        </Button>
        <Button
         className="bg-red-500 hover:bg-red-600"
         onClick={() => setCadastro(false)}
        >
         Não
        </Button>
       </div>
      </div>
      <div>
       <h3 className="text-lg font-semibold text-white">Placa do Veículo</h3>
       <Input
        className="mt-2"
        placeholder="Placa"
        type="text"
        onChange={(e) => setPlaca(e.target.value)}
       />
      </div>
      <div>
       <h3 className="text-lg font-semibold text-white">Ano do Veículo</h3>
       <Input
        placeholder="Ano do Veículo"
        className="mt-2"
        type="text"
        onChange={(e) => setAnoDoVeiculo(e.target.value)}
       />
      </div>
      <div>
       <h3 className="text-lg font-semibold text-white">Marca do Veículo</h3>
       <Input
        className="mt-2"
        placeholder="Marca"
        type="text"
        onChange={(e) => setMarcaVeiculo(e.target.value)}
       />
      </div>
      <div>
       <h3 className="text-lg font-semibold text-white">
        Usuário com Deficiência?
       </h3>
       <div className="flex gap-4 mt-2">
        <Button
         className="bg-green-500 hover:bg-green-600"
         onClick={() => setDeficiente(true)}
        >
         Sim
        </Button>
        <Button className="bg-red-500 hover:bg-red-600">Não</Button>
       </div>
      </div>
     </div>

     {/* Coluna 2 */}
     <div className="flex flex-col gap-4">
      <div>
       <h3 className="text-lg font-semibold text-white">Horário de:</h3>
       <div className="flex gap-4 mt-2">
        <Input
         type="text"
         placeholder="Entrada"
         onChange={(e) => setHorarioEntrada(e.target.value)}
        />
        <Input
         type="text"
         placeholder="Saída"
         onChange={(e) => setHorarioSaida(e.target.value)}
        />
       </div>
      </div>
      <div>
       <h3 className="text-lg font-semibold text-white">Tipo de Veículo</h3>
       <Input
        className="mt-2"
        placeholder="Carro/Moto"
        onChange={(e) => setTipoDoVeiculo(e.target.value)}
       />
      </div>
      <div>
       <h3 className="text-lg font-semibold text-white">CPF</h3>
       <Input
        className="mt-2"
        type="text"
        onChange={(e) => setCpf(e.target.value)}
       />
      </div>
      <div>
       <h3 className="text-lg font-semibold text-white">Nome do cliente</h3>
       <Input
        className="mt-2"
        type="text"
        onChange={(e) => setNome(e.target.value)}
       />
      </div>
     </div>
    </div>

    {/* Nota Fiscal */}
    <div className="bg-white rounded-lg shadow-xl p-8">
     <h1 className="text-2xl font-bold text-gray-800 mb-6">Nota Fiscal</h1>
     <div className="flex flex-col gap-12">
      {listaNotaFiscal.map((nota, index) => (
       <div key={index} className="flex justify-between gap-12">
        <div>
         <p className="font-bold text-gray-600">
          Nome: <span className="font-normal">{nota.nome}</span>
         </p>
         <p className="font-bold text-gray-600">
          CPF: <span className="font-normal">{nota.cpf}</span>
         </p>
         <p className="font-bold text-gray-600">
          Placa do Veículo:{" "}
          <span className="font-normal">{nota.placaVeiculo}</span>
         </p>
         <p className="font-bold text-gray-600">
          Ano do Veículo:{" "}
          <span className="font-normal">{nota.anoDoVeiculo}</span>
         </p>
         <p className="font-bold text-gray-600 ">
          Veículo: <span className="font-normal">{nota.tipoVeiculo}</span>
         </p>
        </div>
        <div>
         <div>
          <h2 className="font-bold text-gray-600">Horário em minutos</h2>
          <p className="text-gray-600 font-semibold">
           - Entrada: <span className="font-normal">{nota.horarioEntrada}</span>
          </p>
          <p className="text-gray-600 font-semibold">
           - Saída: <span className="font-normal">{nota.horarioSaida}</span>
          </p>
          <p className="text-gray-600 font-semibold">
           - Total:{" "}
           <span className="font-normal">{nota.tempoTotal} minutos</span>
          </p>
         </div>
         <p className="font-bold text-gray-600 mt-4">
          Situacao:
          <span className="font-normal">
           {nota.custo ? " cadastrado" : " Nao castrado"}
          </span>
         </p>
         <p className="text-gray-600 font-semibold">
          Custo Total:{" "}
          <span className="font-normal">R$ {nota.custo} reais</span>
         </p>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Sessão Inferior */}
   <div className="grid grid-cols-2 gap-8 w-full max-w-5xl mt-12">
    <div className="flex flex-col gap-8">
     <h1 className="text-4xl font-bold text-white">Descrição das Vagas</h1>
     <ul className="flex flex-col gap-4">
      <li className="flex gap-4 items-center">
       <span className="w-12 h-12 bg-green-500 rounded-full"></span>
       <p className="text-xl text-white">Carro</p>
      </li>
      <li className="flex gap-4 items-center">
       <span className="w-12 h-12 bg-pink-500 rounded-full"></span>
       <p className="text-xl text-white">Moto</p>
      </li>
      <li className="flex gap-4 items-center">
       <span className="w-12 h-12 bg-blue-500 rounded-full"></span>
       <p className="text-xl text-white">Vaga Especial</p>
      </li>
      <li className="flex gap-4 items-center">
       <span className="w-12 h-12 bg-gray-500 rounded-full"></span>
       <p className="text-xl text-white">Ocupada</p>
      </li>
     </ul>
    </div>

    <div className="flex flex-col gap-8">
     <h1 className="text-4xl font-bold text-white">Mapa de Vagas</h1>
     <div className="flex flex-wrap gap-2 w-[550px]">
      {_vagasCarro.map((vaga, index) => (
       <div
        key={vaga.nome}
        onClick={() => setVagaSelecionadaCarro(index)}
        className={`w-12 h-12 flex items-center justify-center rounded-md text-white cursor-pointer ${
         vaga.ocupada
          ? "bg-gray-500"
          : vaga.eEspecial
          ? "bg-blue-500"
          : vaga.tipoDeVaga === "Carro"
          ? "bg-green-500"
          : ""
        }`}
       >
        {vaga.nome}
       </div>
      ))}
     </div>
     <div className="flex flex-wrap gap-2 w-[550px] cursor-pointer">
      {_vagasMoto.map((vaga, index) => (
       <div
        key={vaga.nome}
        onClick={() => setVagaSelecionadaMoto(index)}
        className={`w-12 h-12 flex items-center justify-center rounded-md text-white ${
         vaga.ocupada
          ? "bg-gray-500"
          : vaga.eEspecial
          ? "bg-blue-500"
          : vaga.tipoDeVaga === "Moto"
          ? "bg-pink-500"
          : ""
        }`}
       >
        {vaga.nome}
       </div>
      ))}
     </div>
    </div>
    <Button
     className="self-start w-96 h-20 mt-12 bg-blue-600 hover:bg-blue-700 text-xl"
     onClick={() => handleOnSubmit()}
    >
     Enviar Informações
    </Button>
   </div>
  </div>
 );
}

export default App;
