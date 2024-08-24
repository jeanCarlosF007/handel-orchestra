**Projeto 01 - Landing Page (+praTi e Codifica) 2024/1**

**ATENÇÃO:** Conforme descrito abaixo, a ideia deste projeto é o desenvolvimento de uma Landing Page simples utilizando HTML5, CSS3 e Javascript. Não há requisitos especiais para poder rodar o projeto em questão; basta abrir o arquivo index.html no seu navegador (de preferência, Chrome) e que este esteja atualizado.

**OBJETIVO:** *Desenvolver uma landing page simples utilizando HTML, CSS e JavaScript.*

**CONTEÚDO MÍNIMO DA LANDING PAGE:**

- Configure um repositório Git para o projeto.
- Crie duas branches: uma principal (main) e outra de desenvolvimento (develop).
- Um cabeçalho com o nome do projeto.
- Uma breve descrição ou slogan.
- Um botão de chamada para ação como "Saiba Mais" ou "Inscreva-se".
- Uma seção de produtos e/ou serviços oferecidos.
- Uma área de sobre/contato com um formulário simples (nome, email e mensagem).
- Ação de botão de chamada para ação (por exemplo, exibir uma mensagem de agradecimento ou redirecionar para outra página, utilizando JS, claro).
- Escolha uma paleta de cores harmoniosa e fontes apropriadas.


---------------------------------------------------------------------------------------------------------------

**Atividade 03 - Landing Page (+praTi e Codifica) 2024/1**

NOVAS FEATURES (NO MÍNIMO ESSAS):

- Crie uma branche adicional para o desenvolvimento dos novos recursos do projeto;
- Reestruture a aplicação para que ela seja estruturada através de Grid e Flexbox;
- Faça com que as transições sejam assíncronas através de: ajax, fetch e promises;
- Adicione operações CRUD com o LocalStorage;
- Responsividade completa.


OPCIONAIS DIFERENCIAIS:
- Uso de libs como Bootstrap, Tailwind,  e afins;
- Tratativa de erros;
- Dark mode;
- Animações (Carousel, por exemplo);

---------------------------------------------------------------------------------------------------------------

**Sobre a página**

A ideia foi criar uma página para uma orquestra, onde é possível ter informações sobre a orquestra em si, as próximas apresentações, bem como um formulário de inscrição. Inicialmente, o formulário era para uma newsletter, mas com a atualização que exigia um CRUD o formulário passou a ser para inscrever-se para testes de audição para ingresso na orquestra. 
Note que a ideia é apenas demonstrar a possibilidade de um CRUD; é uma página rudimentar e, caso levada a negócio futuramente, será aprimorada.
Idealmente, o usuário terá um cadastro próprio e as inscrições estarão vinculadas a *este cadastro específico*, de modo que os campos de informação pessoal seriam automaticamente preenchidos com base no cadastro da pessoa (por isso não há a necessidade de validação caso se trate de pessoas diferentes fazendo a inscrição). Fora isso, todas as validações - como se a inscrição está aberta ou não, se o CEP é válido etc. estão aplicadas. O campo "Conte-nos mais sobre você" não é editável, pois entende-se que não haveria por que "corrigir" este campo - ou ao menos seria exceção, de modo que a pessoa pode cancelar a inscrição e realizá-la novamente. Ademais, como ainda não está vinculado a uma pessoa específica (pode-se inserir dados de pessoas diferentes), é permitida a inscrição mais de uma vez na mesma posição. 
Quanto à edição das inscrições em aberto e suas respectivas datas de encerramento, futuramente é possível atribuir o login de um usuário ADMIN que pode realizar essa edição, a qual incidirá sobre o código para realizar as validações de acordo com as datas específicas no momento do preenchimento do formulário.