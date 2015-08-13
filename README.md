# progressive-profiling
Solução de progressive profiling para Landing Pages do RD Station

## Uso

1. Fazer uma cópia da planilha modelo encontrada no link: [Modelo Campos dos Formulários](https://docs.google.com/spreadsheets/d/1cJ5aKZgMTXyY79FOVANFfHSKKnYLijUrvcz4IuBCumc/edit#gid=0)

2. Tornar esta nova planilha pública em File -> Publish to the Web (não é o mesmo que compartilhar a planilha para qualaquer um com o link).

3. Agora vá em Editar nas Landing Pages que serão alteradas, vá em aparências e adicione o seguinte JavaScript em HEAD (o primeiro campo)

 ```HTML
  <script src="https://cdn.rawgit.com/ResultadosDigitais/progressive-profiling/v1.1/progressive.min.js"></script>
 ```

4. Ainda em aparências, insira o seguinte JavaScript em BODY (é necessário clicar no texto para expandir)
 Obs: É necessario o saber o id da sua planilha. Esse id é o conjunto de caracters encontrado entre o "/d/" e o "/edit" no link da sua planilha.
 ```HTML
  <script>
    setProgressiveProfiling(“COLE-AQUI-O-ID-DA-SUA-PLANILHA”);
  </script>
 ```

## Para configurar a Planilha

### Nivel:
O nível representa em que momentos (número de conversões realizadas) o campo aparecerá no formulário, ex:

  0 nome
  0 email
  0 estado
  1 site
  1 quanto investe em marketing digital?
  2 telefone

Na primeira vez aparecerão nome, email e estado, após ele converter uma vez aparecerá site e quanto investe em marketing digital e na próxima conversão aparecerá o campo telefone.

### Label:
É o texto que vai aparecer no formulário.

### Name:
Diferentemente do Label, essa coluna representa o identificador do campo.
Para campos padrões esse valor será o nome do campo em letras minúsculas. ex: Para o campo Email,você deve preencher email.

Para os campos personalizados temos que fazer o seguinte procedimento:
 - Dentro do RDStation, vá em campos personalizados, busque pelo campo desejado e clique em editar.
 - Na url desta página o ID será o número entre "/campos-personalizados/" e "/editar", por exemplo, na url a seguir:
'https://www.rdstation.com.br/campos-personalizados/10032/editar"
o ID é 10032.
 - Com esse ID, o valor a ser preenchido é custom_fields[ID-DO-CAMPO], para o exemplo acima deve ser preechido custom_fields[10032].

### Type:
Nesta coluna você deve selecionar o tipo do campo:
select - selecionar alguma das opções.
number - número
text - texto
email - email (igual ao texto porem com validação)
radio - seleciona ou não qualquer opção (pode ser zero ou mais de uma)

### Options:
Em campos abertos, basta colocar 0 na coluna de options.
Caso o campo possua opções, colocar as opções idênticas às opções criadas no campo da RDStation, separados por ponto e vírgula. ex: Analista de marketing; Gerente / Coordenador de Marketing; Gerente / Coordenador de Vendas; Diretor; Sócio / CEO; Outros Cargos

### Observações:
Caso ocorre um erro no carregamento dos dados da planilha, aparecerão os campos configurados dentro RD station.
As conversõs entram normalmente no RDStation com o identificador da própria LP.
Para monitorar as taxas de conversões utilizamos o GA. o script já envia eventos de categoria Progressive_Profiling e as ações indicando visualizções e converões de cada nível.
