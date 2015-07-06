# progressive-profiling
Solução de progressive profiling para Landing Pages do RD Station

## Uso

1. Fazer uma cópia da planilha modelo encontrada no link: [Modelo Campos dos Formulários](https://docs.google.com/spreadsheets/d/1cJ5aKZgMTXyY79FOVANFfHSKKnYLijUrvcz4IuBCumc/edit#gid=0)

2. Tornar esta nova planilha pública.

3. Agora vá em Editar nas Landing Pages que serão alteradas, vá em aparências e adicione o seguinte JavaScript (o primeiro campo)

 ```HTML
  <script src="https://raw.githubusercontent.com/ResultadosDigitais/progressive-profiling/master/progressive.js"></script>
 ```

4. Ainda em aparências, insira o seguinte JavaScript em BODY (é necessário clicar no texto para expandir)
 Obs: É necessario o saber o id da sua planilha. Esse id é o conjunto de caracters encontrado entre o "/d/" e o "/edit" no link da sua planilha.
 ```HTML
  <script>
    setProgressiveProfiling(“COLE-AQUI-O-ID-DA-SUA-PLANILHA”);
  </script>
 ```
