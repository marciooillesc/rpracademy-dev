/**
 * features/jogos/quiz-educacao-digital.js
 * Quiz Verdadeiro ou Falso — Educação Digital Acadêmico
 *
 * 6 temas × 3 faixas = 18 conjuntos, 15 afirmações cada (270 no total).
 * Temas: Segurança Digital/LGPD · Redes e Internet · Hardware e Montagem
 *        Programação e Lógica · IA e Tecnologias Emergentes · Office/Ferramentas Digitais
 * Faixas: 6º–9º Ano · Ensino Médio · Técnico/Superior
 *
 * Mecânica: timer por questão, 3 vidas, streak multiplier, explicação pós-resposta.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// BANCO DE CONTEÚDO
// ═══════════════════════════════════════════════════════════════════════════════

const TEMAS = [

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. SEGURANÇA DIGITAL / LGPD
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'seguranca',
    nome: 'Segurança Digital e LGPD',
    emoji: '🔒',
    cor: '#f87171',
    faixas: [
      {
        id: 'fund2',
        nome: '6º ao 9º Ano',
        emoji: '📗',
        tempo: 12,
        afirmacoes: [
          { v: true,  exp: 'Senhas longas e variadas são muito mais difíceis de descobrir.',
            texto: 'Uma senha forte deve ter letras maiúsculas, minúsculas, números e símbolos.' },
          { v: false, exp: 'Compartilhar senhas, mesmo com amigos, representa risco à sua privacidade.',
            texto: 'É seguro compartilhar sua senha com amigos de confiança.' },
          { v: true,  exp: 'Phishing é uma das formas mais comuns de golpe digital.',
            texto: 'Phishing é um golpe onde criminosos se passam por empresas para roubar dados.' },
          { v: false, exp: 'Redes públicas podem ser monitoradas por terceiros mal-intencionados.',
            texto: 'Conectar-se a Wi-Fi público em shoppings é completamente seguro.' },
          { v: true,  exp: 'O 2FA adiciona uma segunda barreira de proteção além da senha.',
            texto: 'A autenticação em dois fatores (2FA) torna o login mais seguro.' },
          { v: false, exp: 'A mesma senha em vários sites significa que um vazamento compromete tudo.',
            texto: 'Usar a mesma senha em todos os sites é uma prática recomendada.' },
          { v: true,  exp: 'Atualizações corrigem brechas de segurança descobertas nos sistemas.',
            texto: 'Manter o sistema operacional atualizado ajuda a proteger o computador.' },
          { v: true,  exp: 'Antivírus identifica e remove programas maliciosos do sistema.',
            texto: 'Um antivírus ajuda a detectar e eliminar vírus e malwares.' },
          { v: false, exp: 'Ransomware sequestra dados e exige pagamento para devolvê-los.',
            texto: 'Ransomware é um vírus que exibe propagandas indesejadas.' },
          { v: true,  exp: 'Dados pessoais incluem nome, CPF, endereço, e-mail, entre outros.',
            texto: 'Dados pessoais são informações que identificam ou podem identificar uma pessoa.' },
          { v: false, exp: 'Um cadeado indica HTTPS — conexão criptografada e mais segura.',
            texto: 'Sites sem o cadeado de segurança são tão seguros quanto os que têm.' },
          { v: true,  exp: 'Spoofing é quando alguém falsifica identidade para enganar a vítima.',
            texto: 'É possível falsificar o remetente de um e-mail para enganar o destinatário.' },
          { v: true,  exp: 'Engenharia social explora a confiança humana, não apenas tecnologia.',
            texto: 'Engenharia social manipula pessoas para obter informações confidenciais.' },
          { v: false, exp: 'O modo anônimo apenas oculta o histórico local; não garante anonimato.',
            texto: 'Navegar em modo anônimo torna o usuário completamente anônimo na internet.' },
          { v: true,  exp: 'A LGPD (Lei 13.709/2018) regula o tratamento de dados pessoais no Brasil.',
            texto: 'A LGPD é uma lei brasileira que protege os dados pessoais dos cidadãos.' },
        ],
      },
      {
        id: 'medio',
        nome: 'Ensino Médio',
        emoji: '📘',
        tempo: 14,
        afirmacoes: [
          { v: true,  exp: 'A LGPD define bases legais como consentimento, legítimo interesse e obrigação legal.',
            texto: 'A LGPD exige que o tratamento de dados pessoais tenha uma base legal definida.' },
          { v: false, exp: 'A LGPD se aplica a qualquer organização que trate dados de pessoas no Brasil.',
            texto: 'A LGPD se aplica apenas a empresas privadas com fins lucrativos.' },
          { v: true,  exp: 'A ANPD foi criada para fiscalizar o cumprimento da LGPD.',
            texto: 'A ANPD (Autoridade Nacional de Proteção de Dados) fiscaliza a LGPD no Brasil.' },
          { v: true,  exp: 'Criptografia assimétrica usa chave pública para cifrar e privada para decifrar.',
            texto: 'Na criptografia assimétrica, o par de chaves pública e privada é utilizado.' },
          { v: false, exp: 'Firewall filtra tráfego de rede, mas não escaneia o conteúdo de arquivos.',
            texto: 'Um firewall substitui completamente o antivírus na proteção do computador.' },
          { v: true,  exp: 'Zero-day é uma vulnerabilidade ainda sem patch disponível.',
            texto: 'Vulnerabilidades zero-day são falhas ainda não corrigidas pelo fabricante.' },
          { v: true,  exp: 'HTTPS usa TLS para criptografar a comunicação entre cliente e servidor.',
            texto: 'O protocolo HTTPS utiliza criptografia TLS para proteger a transmissão de dados.' },
          { v: false, exp: 'Senhas fortes devem ter no mínimo 12 caracteres e diversidade de tipos.',
            texto: 'Uma senha de 6 caracteres com letras e números é considerada forte.' },
          { v: true,  exp: 'Logs registram eventos do sistema e são essenciais para auditoria.',
            texto: 'Logs de sistema são importantes para detectar e investigar incidentes de segurança.' },
          { v: true,  exp: 'Titular, controlador e operador são papéis definidos pela LGPD.',
            texto: 'A LGPD define os papéis de titular de dados, controlador e operador.' },
          { v: false, exp: 'DLP (Data Loss Prevention) foca em evitar vazamento de dados sensíveis.',
            texto: 'DLP é uma tecnologia usada para acelerar transferências de dados na rede.' },
          { v: true,  exp: 'Pentest simula ataques reais para encontrar vulnerabilidades antes de agentes maliciosos.',
            texto: 'Pentest (teste de penetração) é uma prática legítima de segurança ofensiva.' },
          { v: false, exp: 'VPN criptografa o tráfego mas não garante anonimato total.',
            texto: 'Usar VPN garante anonimato total e elimina qualquer risco de rastreamento.' },
          { v: true,  exp: 'O direito ao esquecimento permite solicitar exclusão de dados em certas condições.',
            texto: 'A LGPD garante ao titular o direito de solicitar a exclusão de seus dados.' },
          { v: true,  exp: 'Ransomware WannaCry afetou hospitais e órgãos em 2017 globalmente.',
            texto: 'Ataques de ransomware podem paralisar infraestruturas críticas como hospitais.' },
        ],
      },
      {
        id: 'tecnico',
        nome: 'Técnico / Superior',
        emoji: '📙',
        tempo: 16,
        afirmacoes: [
          { v: true,  exp: 'A LGPD se inspira no GDPR europeu, com estrutura similar de direitos e obrigações.',
            texto: 'A LGPD brasileira foi influenciada pelo GDPR (Regulamento Europeu de Proteção de Dados).' },
          { v: false, exp: 'Dados sensíveis incluem origem racial, saúde, biometria, religião e outros.',
            texto: 'CPF e endereço são considerados dados sensíveis pela LGPD.' },
          { v: true,  exp: 'SIEM centraliza e correlaciona logs para detecção de ameaças em tempo real.',
            texto: 'SIEM (Security Information and Event Management) monitora eventos de segurança em tempo real.' },
          { v: true,  exp: 'O modelo Zero Trust pressupõe que nenhuma entidade, interna ou externa, é confiável por padrão.',
            texto: 'O modelo Zero Trust nunca confia e sempre verifica, independente da localização do usuário.' },
          { v: false, exp: 'IDS detecta intrusões; IPS as detecta e bloqueia ativamente.',
            texto: 'IDS (Intrusion Detection System) bloqueia automaticamente ataques detectados.' },
          { v: true,  exp: 'OWASP Top 10 lista as vulnerabilidades mais críticas em aplicações web.',
            texto: 'SQL Injection e XSS estão entre as vulnerabilidades listadas no OWASP Top 10.' },
          { v: true,  exp: 'Esteganografia oculta informações dentro de arquivos como imagens ou áudios.',
            texto: 'Esteganografia é a técnica de ocultar dados dentro de outros arquivos.' },
          { v: false, exp: 'SHA-256 é uma função hash unidirecional, não uma cifra reversível.',
            texto: 'SHA-256 é um algoritmo de criptografia simétrica para proteger senhas.' },
          { v: true,  exp: 'DPO é o encarregado de dados exigido pela LGPD em certas organizações.',
            texto: 'O DPO (Data Protection Officer) é responsável pela conformidade com a LGPD na organização.' },
          { v: true,  exp: 'CVE é um dicionário público de vulnerabilidades com identificadores únicos.',
            texto: 'O CVE (Common Vulnerabilities and Exposures) cataloga vulnerabilidades conhecidas publicamente.' },
          { v: false, exp: 'Autenticação verifica identidade; autorização define o que o usuário pode fazer.',
            texto: 'Autenticação e autorização são processos equivalentes em segurança da informação.' },
          { v: true,  exp: 'RBAC define permissões baseadas no papel do usuário na organização.',
            texto: 'O modelo RBAC (Role-Based Access Control) controla acessos com base em funções.' },
          { v: true,  exp: 'Supply chain attacks comprometem software legítimo no processo de distribuição.',
            texto: 'Ataques à cadeia de suprimentos de software (supply chain) comprometem pacotes legítimos.' },
          { v: false, exp: 'Notificação à ANPD deve ocorrer em prazo razoável após o incidente.',
            texto: 'A LGPD exige notificação imediata (em 24h) à ANPD em qualquer incidente de dados.' },
          { v: true,  exp: 'Threat modeling identifica ameaças e pontos de risco antes do desenvolvimento.',
            texto: 'Threat modeling é uma prática de segurança aplicada na fase de design de sistemas.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. REDES E INTERNET
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'redes',
    nome: 'Redes e Internet',
    emoji: '🌐',
    cor: '#38bdf8',
    faixas: [
      {
        id: 'fund2',
        nome: '6º ao 9º Ano',
        emoji: '📗',
        tempo: 12,
        afirmacoes: [
          { v: true,  exp: 'IP é o endereço único que identifica um dispositivo em uma rede.',
            texto: 'O endereço IP identifica um dispositivo na rede.' },
          { v: false, exp: 'DNS traduz nomes de domínio (ex: google.com) em endereços IP.',
            texto: 'O DNS (Domain Name System) converte endereços IP em senhas de acesso.' },
          { v: true,  exp: 'Roteadores direcionam pacotes entre redes diferentes.',
            texto: 'O roteador direciona os dados entre a rede local e a internet.' },
          { v: true,  exp: 'LAN é uma rede local, como a de uma escola ou empresa.',
            texto: 'LAN (Local Area Network) é uma rede que cobre uma área geográfica pequena.' },
          { v: false, exp: 'Wi-Fi é uma tecnologia de rede sem fio, não um cabo.',
            texto: 'Wi-Fi usa cabos de fibra óptica para transmitir dados.' },
          { v: true,  exp: 'HTTP é o protocolo padrão para comunicação na web.',
            texto: 'O protocolo HTTP é usado para acessar páginas na internet.' },
          { v: false, exp: 'Download é baixar dados; upload é enviar dados para a internet.',
            texto: 'Upload significa baixar arquivos da internet para o computador.' },
          { v: true,  exp: 'Servidores são computadores que fornecem serviços e recursos para outros.',
            texto: 'Um servidor é um computador que fornece serviços para outros dispositivos na rede.' },
          { v: true,  exp: 'A internet é uma rede global que conecta bilhões de dispositivos.',
            texto: 'A internet conecta computadores e dispositivos do mundo inteiro.' },
          { v: false, exp: 'O modem converte o sinal da operadora para uso na rede doméstica.',
            texto: 'O modem e o roteador são exatamente o mesmo equipamento.' },
          { v: true,  exp: 'IPv4 usa endereços de 32 bits, como 192.168.1.1.',
            texto: 'Um endereço IPv4 é composto por quatro grupos de números separados por pontos.' },
          { v: false, exp: 'Dados viajam em pacotes, que podem tomar rotas diferentes.',
            texto: 'Dados na internet são transmitidos sempre pelo mesmo caminho fixo.' },
          { v: true,  exp: 'Largura de banda determina a velocidade máxima de transmissão.',
            texto: 'Maior largura de banda significa que mais dados podem ser transmitidos por segundo.' },
          { v: true,  exp: 'Switches conectam dispositivos dentro de uma mesma rede local.',
            texto: 'O switch é usado para conectar múltiplos dispositivos em uma rede local.' },
          { v: false, exp: 'Fibra óptica transmite dados via luz, sendo muito mais rápida que o cobre.',
            texto: 'Cabos de cobre são mais rápidos que a fibra óptica para transmissão de dados.' },
        ],
      },
      {
        id: 'medio',
        nome: 'Ensino Médio',
        emoji: '📘',
        tempo: 14,
        afirmacoes: [
          { v: true,  exp: 'O modelo OSI tem 7 camadas: Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação.',
            texto: 'O modelo OSI organiza as funções de rede em 7 camadas hierárquicas.' },
          { v: false, exp: 'TCP garante entrega confiável com confirmações; UDP é mais rápido sem garantias.',
            texto: 'UDP (User Datagram Protocol) garante a entrega confiável dos pacotes.' },
          { v: true,  exp: 'NAT permite que múltiplos dispositivos compartilhem um único IP público.',
            texto: 'NAT (Network Address Translation) traduz endereços IP privados para o IP público.' },
          { v: true,  exp: 'IPv6 usa 128 bits, permitindo um número praticamente ilimitado de endereços.',
            texto: 'O IPv6 foi criado para resolver o esgotamento de endereços IPv4.' },
          { v: false, exp: 'DHCP atribui endereços IP automaticamente; configuração manual é estática.',
            texto: 'DHCP é usado apenas em redes sem fio (Wi-Fi).' },
          { v: true,  exp: 'A porta 443 é o padrão para HTTPS; porta 80 para HTTP.',
            texto: 'HTTPS utiliza por padrão a porta 443 para comunicação segura.' },
          { v: true,  exp: 'DNS usa a porta 53 por padrão para consultas de resolução de nomes.',
            texto: 'O protocolo DNS utiliza a porta 53 para resolver nomes de domínio.' },
          { v: false, exp: 'Latência é o tempo de ida e volta do dado; banda é a capacidade de vazão.',
            texto: 'Latência e largura de banda são sinônimos em redes de computadores.' },
          { v: true,  exp: 'VLANs segmentam logicamente uma rede física em redes virtuais distintas.',
            texto: 'VLANs permitem segmentar uma rede física em redes lógicas separadas.' },
          { v: true,  exp: 'BGP é o protocolo usado para roteamento entre sistemas autônomos na internet.',
            texto: 'O protocolo BGP é responsável pelo roteamento entre grandes redes na internet.' },
          { v: false, exp: 'Ping usa ICMP para testar conectividade e medir latência.',
            texto: 'O comando ping utiliza o protocolo TCP para verificar conectividade.' },
          { v: true,  exp: 'Topologia em estrela concentra conexões em um switch ou hub central.',
            texto: 'Na topologia estrela, todos os dispositivos se conectam a um ponto central.' },
          { v: true,  exp: 'QoS prioriza tráfego crítico (como VoIP) sobre outros tipos de dados.',
            texto: 'QoS (Quality of Service) permite priorizar tipos de tráfego na rede.' },
          { v: false, exp: 'FTP transfere arquivos; SMTP envia e-mails.',
            texto: 'O protocolo SMTP é utilizado para transferência de arquivos entre servidores.' },
          { v: true,  exp: 'CDN distribui conteúdo em servidores ao redor do mundo para reduzir latência.',
            texto: 'CDN (Content Delivery Network) aproxima conteúdo dos usuários para melhorar performance.' },
        ],
      },
      {
        id: 'tecnico',
        nome: 'Técnico / Superior',
        emoji: '📙',
        tempo: 16,
        afirmacoes: [
          { v: true,  exp: 'OSPF é um protocolo de estado de enlace que calcula rotas pelo algoritmo de Dijkstra.',
            texto: 'OSPF (Open Shortest Path First) é um protocolo de roteamento interno baseado em estado de enlace.' },
          { v: false, exp: 'MPLS encapsula pacotes com rótulos para comutação rápida, independente de IP.',
            texto: 'MPLS (Multiprotocol Label Switching) funciona exclusivamente com IPv6.' },
          { v: true,  exp: 'SDN separa o plano de controle do plano de dados para gerenciamento centralizado.',
            texto: 'SDN (Software-Defined Networking) separa o plano de controle do plano de dados.' },
          { v: true,  exp: 'Subnetting divide um bloco de endereços IP em sub-redes menores usando máscara.',
            texto: 'Subnetting permite dividir uma rede IP em sub-redes menores para melhor organização.' },
          { v: false, exp: 'TCP usa three-way handshake (SYN, SYN-ACK, ACK) para estabelecer conexão.',
            texto: 'O TCP usa um processo de two-way handshake para estabelecer conexões.' },
          { v: true,  exp: 'SNMP coleta métricas e gerencia dispositivos de rede como switches e roteadores.',
            texto: 'SNMP (Simple Network Management Protocol) é usado para monitorar dispositivos de rede.' },
          { v: true,  exp: 'Anycast roteia para o servidor mais próximo do cliente entre vários com o mesmo IP.',
            texto: 'Anycast permite que múltiplos servidores compartilhem o mesmo endereço IP para roteamento otimizado.' },
          { v: false, exp: 'ARP resolve endereços IP em endereços MAC na mesma rede local.',
            texto: 'ARP (Address Resolution Protocol) traduz endereços MAC em endereços IP.' },
          { v: true,  exp: 'GRE cria túneis para encapsular protocolos dentro de redes IP.',
            texto: 'GRE (Generic Routing Encapsulation) é usado para criar túneis de rede.' },
          { v: true,  exp: 'Redes mesh têm redundância total com múltiplos caminhos entre nós.',
            texto: 'Em topologia mesh completa, cada nó se conecta diretamente a todos os outros.' },
          { v: false, exp: 'NTP sincroniza relógios de sistemas em uma rede.',
            texto: 'NTP (Network Time Protocol) é utilizado para transferência segura de arquivos.' },
          { v: true,  exp: 'QUIC é protocolo de transporte desenvolvido pelo Google, base do HTTP/3.',
            texto: 'O protocolo QUIC é a base do HTTP/3 e oferece menor latência que TCP.' },
          { v: true,  exp: 'Wireshark captura e analisa pacotes de rede em tempo real.',
            texto: 'Wireshark é uma ferramenta de análise de pacotes de rede (packet sniffer).' },
          { v: false, exp: 'AS (Sistema Autônomo) é um conjunto de redes sob uma política de roteamento única.',
            texto: 'Um Sistema Autônomo (AS) na internet é definido por seu endereço IP público único.' },
          { v: true,  exp: 'Multicast envia dados para um grupo específico de destinatários simultaneamente.',
            texto: 'Multicast transmite dados para múltiplos destinos sem duplicar o tráfego na origem.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. HARDWARE E MONTAGEM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'hardware',
    nome: 'Hardware e Montagem',
    emoji: '🖥️',
    cor: '#34d399',
    faixas: [
      {
        id: 'fund2',
        nome: '6º ao 9º Ano',
        emoji: '📗',
        tempo: 12,
        afirmacoes: [
          { v: true,  exp: 'A placa-mãe interliga todos os componentes do computador.',
            texto: 'A placa-mãe é o componente que conecta todos os outros do computador.' },
          { v: false, exp: 'A CPU processa dados; a GPU processa gráficos.',
            texto: 'A GPU (placa de vídeo) é responsável por processar todas as instruções do sistema.' },
          { v: true,  exp: 'SSD usa memória flash, sem partes móveis, sendo mais rápido e durável.',
            texto: 'O SSD é mais rápido que o HD mecânico por não ter partes móveis.' },
          { v: true,  exp: 'A fonte converte a corrente alternada da tomada em corrente contínua.',
            texto: 'A fonte de alimentação converte a corrente elétrica para o padrão usado pelos componentes.' },
          { v: false, exp: 'RAM é temporária; HD e SSD são permanentes.',
            texto: 'A memória RAM guarda os dados permanentemente, mesmo após desligar o PC.' },
          { v: true,  exp: 'GHz indica quantos ciclos por segundo o processador executa.',
            texto: 'A frequência do processador em GHz indica a velocidade de processamento.' },
          { v: true,  exp: 'USB é uma interface universal usada para conectar periféricos ao computador.',
            texto: 'A porta USB permite conectar dispositivos como mouses, teclados e pen drives.' },
          { v: false, exp: 'HDMI transmite áudio e vídeo simultaneamente em um único cabo.',
            texto: 'O cabo HDMI transmite apenas imagem, sem áudio.' },
          { v: true,  exp: 'Mais núcleos permitem executar mais tarefas ao mesmo tempo.',
            texto: 'Processadores com múltiplos núcleos (cores) conseguem executar mais tarefas simultaneamente.' },
          { v: false, exp: 'A BIOS/UEFI inicializa o hardware antes do sistema operacional carregar.',
            texto: 'A BIOS é um software instalado no HD que inicia o sistema operacional.' },
          { v: true,  exp: 'Cooler dissipa o calor gerado pelo processador durante o funcionamento.',
            texto: 'O cooler (dissipador) serve para refrigerar o processador.' },
          { v: true,  exp: 'Cada slot RAM tem capacidade e velocidade diferentes conforme a geração.',
            texto: 'Pentes de RAM têm diferentes gerações (DDR3, DDR4, DDR5) e não são intercambiáveis.' },
          { v: false, exp: 'HD mecânico tem prato giratório e cabeça de leitura; é mais suscetível a choques.',
            texto: 'HD mecânico e SSD têm o mesmo nível de resistência a impactos físicos.' },
          { v: true,  exp: 'Placa de rede (NIC) conecta o computador a redes com ou sem fio.',
            texto: 'A placa de rede permite a comunicação do computador com outros dispositivos em rede.' },
          { v: false, exp: 'Thermal paste é aplicada entre o processador e o cooler para melhorar a condução de calor.',
            texto: 'A pasta térmica é aplicada entre a placa-mãe e a fonte de alimentação.' },
        ],
      },
      {
        id: 'medio',
        nome: 'Ensino Médio',
        emoji: '📘',
        tempo: 14,
        afirmacoes: [
          { v: true,  exp: 'Overclocking aumenta a frequência além do padrão de fábrica para mais desempenho.',
            texto: 'Overclocking é a prática de operar um componente acima de sua frequência nominal.' },
          { v: false, exp: 'PCIe é a interface usada para GPU, NVMe e outros dispositivos de alta velocidade.',
            texto: 'Placas de vídeo modernas utilizam a interface AGP para se conectar à placa-mãe.' },
          { v: true,  exp: 'Cache L1 fica dentro do núcleo do processador e é o mais rápido e menor.',
            texto: 'O cache L1 do processador é o mais rápido e possui menor capacidade.' },
          { v: true,  exp: 'NVMe conecta SSDs via PCIe, com velocidades muito superiores ao SATA.',
            texto: 'SSDs NVMe são significativamente mais rápidos que SSDs SATA.' },
          { v: false, exp: 'TDP indica o calor máximo que o cooler deve ser capaz de dissipar.',
            texto: 'TDP (Thermal Design Power) indica a potência máxima que um processador consome em idle.' },
          { v: true,  exp: 'ECC RAM detecta e corrige erros de memória, usada em servidores.',
            texto: 'Memória ECC é utilizada em servidores por sua capacidade de detectar e corrigir erros.' },
          { v: true,  exp: 'POST verifica hardware essencial antes de iniciar o sistema operacional.',
            texto: 'O POST (Power-On Self Test) verifica os componentes de hardware ao ligar o computador.' },
          { v: false, exp: 'Dual channel dobra a largura de banda usando dois pentes no modo correto.',
            texto: 'Dual channel funciona com qualquer combinação de pentes de RAM instalados.' },
          { v: true,  exp: 'RAID 0 distribui dados entre discos para mais velocidade, sem redundância.',
            texto: 'RAID 0 aumenta a performance distribuindo dados, mas sem tolerância a falhas.' },
          { v: true,  exp: 'RAID 1 espelha dados entre dois discos, garantindo redundância.',
            texto: 'RAID 1 cria um espelho exato dos dados em dois discos para tolerância a falhas.' },
          { v: false, exp: 'A UEFI substituiu a BIOS com suporte a discos maiores e interface gráfica.',
            texto: 'UEFI e BIOS são termos completamente diferentes sem qualquer relação.' },
          { v: true,  exp: 'Chipset coordena a comunicação entre CPU, RAM e periféricos na placa-mãe.',
            texto: 'O chipset da placa-mãe gerencia a comunicação entre os componentes do sistema.' },
          { v: false, exp: 'Memória virtual usa espaço em disco como extensão da RAM quando ela está cheia.',
            texto: 'Memória virtual é um tipo de pente RAM de alta velocidade.' },
          { v: true,  exp: 'GPUs modernas têm milhares de núcleos especializados em computação paralela.',
            texto: 'GPUs possuem milhares de núcleos otimizados para processamento paralelo.' },
          { v: true,  exp: 'Benchmark mede e compara o desempenho de hardware de forma padronizada.',
            texto: 'Ferramentas de benchmark avaliam e comparam o desempenho de componentes de hardware.' },
        ],
      },
      {
        id: 'tecnico',
        nome: 'Técnico / Superior',
        emoji: '📙',
        tempo: 16,
        afirmacoes: [
          { v: true,  exp: 'Pipeline permite buscar, decodificar e executar instruções em paralelo.',
            texto: 'O pipeline de instruções permite a execução paralela de diferentes estágios de processamento.' },
          { v: false, exp: 'Hyper-Threading cria núcleos lógicos extras em cada núcleo físico.',
            texto: 'Hyper-Threading dobra o número de núcleos físicos do processador.' },
          { v: true,  exp: 'NUMA separa a memória em nós locais a cada CPU para menor latência.',
            texto: 'Arquitetura NUMA (Non-Uniform Memory Access) otimiza o acesso à memória em sistemas multiprocessados.' },
          { v: true,  exp: 'PCIe 5.0 oferece largura de banda de 128 GB/s em configuração x16.',
            texto: 'PCIe 5.0 dobrou a largura de banda em relação ao PCIe 4.0.' },
          { v: false, exp: 'RISC tem instruções simples e uniformes; CISC tem instruções complexas e variadas.',
            texto: 'Arquiteturas RISC e CISC possuem a mesma quantidade e complexidade de instruções.' },
          { v: true,  exp: 'Branch prediction tenta prever o próximo caminho de execução para evitar esperas.',
            texto: 'Branch prediction é uma técnica do processador para antecipar o fluxo de execução.' },
          { v: true,  exp: 'Spectre e Meltdown são vulnerabilidades que exploram execução especulativa.',
            texto: 'As vulnerabilidades Spectre e Meltdown exploram a execução especulativa dos processadores.' },
          { v: false, exp: 'DDR5 opera em frequências mais altas e com menor voltagem que DDR4.',
            texto: 'DDR5 opera com maior voltagem que DDR4 para atingir frequências mais altas.' },
          { v: true,  exp: 'SLC, MLC, TLC e QLC determinam quantos bits são armazenados por célula NAND.',
            texto: 'O tipo de célula NAND (SLC, MLC, TLC, QLC) afeta diretamente durabilidade e velocidade do SSD.' },
          { v: true,  exp: 'TPM armazena chaves criptográficas e protege dados como o BitLocker.',
            texto: 'O chip TPM (Trusted Platform Module) fornece funções criptográficas para segurança do hardware.' },
          { v: false, exp: 'DIMM é o formato de pente de RAM para desktops; SO-DIMM para notebooks.',
            texto: 'Pentes DIMM e SO-DIMM são fisicamente compatíveis entre desktops e notebooks.' },
          { v: true,  exp: 'CAS Latency mede a latência em ciclos de clock entre comando e resposta da RAM.',
            texto: 'CAS Latency (CL) é um parâmetro importante para a latência de memórias RAM.' },
          { v: true,  exp: 'IPMI permite gerenciamento remoto do servidor mesmo com o sistema desligado.',
            texto: 'IPMI permite administração remota de servidores fora de banda (out-of-band).' },
          { v: false, exp: 'Wafer é o disco de silício onde os chips são fabricados; die é o chip individual.',
            texto: 'O processo de litografia do chip é medido em polegadas, não em nanômetros.' },
          { v: true,  exp: 'Chiplets permitem combinar dies menores de diferentes fábricas em um pacote.',
            texto: 'A arquitetura chiplet permite combinar múltiplos dies em um único pacote de processador.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. PROGRAMAÇÃO E LÓGICA
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'programacao',
    nome: 'Programação e Lógica',
    emoji: '💻',
    cor: '#818cf8',
    faixas: [
      {
        id: 'fund2',
        nome: '6º ao 9º Ano',
        emoji: '📗',
        tempo: 12,
        afirmacoes: [
          { v: true,  exp: 'Algoritmo é uma sequência finita de passos para resolver um problema.',
            texto: 'Um algoritmo é uma sequência de instruções para resolver um problema.' },
          { v: false, exp: 'Variável é um espaço na memória para armazenar e modificar valores.',
            texto: 'Uma variável em programação não pode ter seu valor alterado após ser criada.' },
          { v: true,  exp: 'Laços como for e while repetem blocos de código enquanto uma condição for verdadeira.',
            texto: 'Estruturas de repetição (loops) executam um bloco de código várias vezes.' },
          { v: true,  exp: 'if/else verifica uma condição e executa blocos diferentes conforme o resultado.',
            texto: 'A estrutura condicional if/else permite tomar decisões no código.' },
          { v: false, exp: 'Computadores trabalham com sistema binário: apenas 0 e 1.',
            texto: 'Computadores processam dados usando o sistema decimal (base 10).' },
          { v: true,  exp: 'Bug é qualquer erro ou falha que faz o programa se comportar de forma inesperada.',
            texto: 'Um bug é um erro no código que causa comportamento inesperado no programa.' },
          { v: true,  exp: 'Scratch, Python e JavaScript são exemplos de linguagens de programação.',
            texto: 'Scratch e Python são exemplos de linguagens de programação.' },
          { v: false, exp: 'Funções são blocos de código reutilizáveis que podem ser chamados várias vezes.',
            texto: 'Uma função em programação só pode ser executada uma única vez.' },
          { v: true,  exp: 'Pseudocódigo é uma forma de representar algoritmos sem seguir a sintaxe de uma linguagem.',
            texto: 'Pseudocódigo descreve um algoritmo de forma legível, sem ser uma linguagem real.' },
          { v: false, exp: 'Decomposição é quebrar um problema grande em partes menores e manejáveis.',
            texto: 'Pensamento computacional significa usar o computador para resolver todos os problemas.' },
          { v: true,  exp: 'Listas (arrays) armazenam múltiplos valores em uma única variável.',
            texto: 'Um array (lista) permite armazenar vários valores em uma mesma variável.' },
          { v: true,  exp: 'Comentários no código explicam o que o código faz, sem afetar a execução.',
            texto: 'Comentários no código são textos que não são executados, apenas explicativos.' },
          { v: false, exp: 'Compilação traduz o código-fonte inteiro para linguagem de máquina antes de executar.',
            texto: 'Um compilador executa o código linha por linha em tempo real.' },
          { v: true,  exp: 'Abstração é focar no essencial de um problema, ignorando detalhes desnecessários.',
            texto: 'Abstração é uma habilidade do pensamento computacional que simplifica problemas complexos.' },
          { v: false, exp: 'HTML é uma linguagem de marcação para estruturar páginas web, não uma linguagem de programação.',
            texto: 'HTML é uma linguagem de programação usada para criar sites.' },
        ],
      },
      {
        id: 'medio',
        nome: 'Ensino Médio',
        emoji: '📘',
        tempo: 14,
        afirmacoes: [
          { v: true,  exp: 'POO organiza o código em objetos com atributos e métodos.',
            texto: 'Orientação a Objetos organiza o código em classes e objetos com atributos e métodos.' },
          { v: false, exp: 'Herança permite que uma subclasse reutilize e estenda comportamentos da superclasse.',
            texto: 'Herança em POO impede que uma classe filha utilize métodos da classe pai.' },
          { v: true,  exp: 'Git rastreia alterações no código e facilita o trabalho colaborativo.',
            texto: 'Git é um sistema de controle de versão que registra o histórico de alterações do código.' },
          { v: true,  exp: 'Complexidade O(n) cresce linearmente conforme o tamanho da entrada.',
            texto: 'A notação Big O descreve o comportamento de um algoritmo conforme o tamanho da entrada cresce.' },
          { v: false, exp: 'Linguagens compiladas geram executáveis; interpretadas são executadas linha a linha.',
            texto: 'Python é uma linguagem compilada que gera binários antes de executar.' },
          { v: true,  exp: 'Stack (pilha) usa LIFO: o último elemento inserido é o primeiro a sair.',
            texto: 'A estrutura de dados Stack (pilha) segue o princípio LIFO (Last In, First Out).' },
          { v: true,  exp: 'APIs definem como sistemas se comunicam através de contratos de interface.',
            texto: 'Uma API define regras para que diferentes sistemas possam se comunicar.' },
          { v: false, exp: 'Recursão é quando uma função chama a si mesma para resolver subproblemas.',
            texto: 'Recursão é uma técnica em que uma função chama outra função diferente repetidamente.' },
          { v: true,  exp: 'SQL permite criar, consultar, atualizar e excluir dados em bancos relacionais.',
            texto: 'SQL é a linguagem padrão para manipulação de bancos de dados relacionais.' },
          { v: true,  exp: 'Testes unitários verificam funções ou métodos isoladamente.',
            texto: 'Testes unitários validam o funcionamento de partes individuais do código.' },
          { v: false, exp: 'JSON é um formato de texto leve para troca de dados entre sistemas.',
            texto: 'JSON (JavaScript Object Notation) é um formato binário de transferência de dados.' },
          { v: true,  exp: 'MVC separa a aplicação em Model (dados), View (interface) e Controller (lógica).',
            texto: 'O padrão MVC divide a aplicação em camadas de dados, visão e controle.' },
          { v: true,  exp: 'Debugging é o processo de encontrar e corrigir erros no código.',
            texto: 'Debugging é a prática de identificar e corrigir bugs em um programa.' },
          { v: false, exp: 'Programação funcional evita estados mutáveis e usa funções puras.',
            texto: 'Programação funcional incentiva o uso extensivo de variáveis globais mutáveis.' },
          { v: true,  exp: 'Docker cria containers que empacotam a aplicação com suas dependências.',
            texto: 'Docker permite empacotar aplicações em containers portáveis e isolados.' },
        ],
      },
      {
        id: 'tecnico',
        nome: 'Técnico / Superior',
        emoji: '📙',
        tempo: 16,
        afirmacoes: [
          { v: true,  exp: 'SOLID são 5 princípios para design de software orientado a objetos de qualidade.',
            texto: 'Os princípios SOLID guiam o design de sistemas orientados a objetos mais manuteníveis.' },
          { v: false, exp: 'DRY significa "Don\'t Repeat Yourself" — evitar duplicação de lógica no código.',
            texto: 'O princípio DRY incentiva a repetição controlada de código para maior clareza.' },
          { v: true,  exp: 'Árvore B+ é usada em bancos de dados para indexação eficiente com acesso O(log n).',
            texto: 'Árvores B+ são amplamente usadas para indexação em sistemas de banco de dados.' },
          { v: true,  exp: 'Garbage collector gerencia automaticamente a memória, liberando objetos não referenciados.',
            texto: 'Garbage collection automatiza o gerenciamento de memória em linguagens como Java e Python.' },
          { v: false, exp: 'Deadlock ocorre quando dois processos esperam indefinidamente por recursos um do outro.',
            texto: 'Deadlock em sistemas operacionais é resolvido automaticamente pelo kernel sem intervenção.' },
          { v: true,  exp: 'Design patterns são soluções reutilizáveis para problemas recorrentes de design.',
            texto: 'Padrões de projeto (design patterns) fornecem soluções reutilizáveis para problemas comuns.' },
          { v: true,  exp: 'Programação reativa lida com fluxos de dados assíncronos e propagação de mudanças.',
            texto: 'Programação reativa é baseada em fluxos de dados assíncronos e propagação de eventos.' },
          { v: false, exp: 'WebSockets permitem comunicação bidirecional persistente entre cliente e servidor.',
            texto: 'WebSockets funcionam apenas com comunicação unidirecional do servidor para o cliente.' },
          { v: true,  exp: 'CI/CD automatiza build, teste e deploy, acelerando o ciclo de entrega de software.',
            texto: 'CI/CD (Integração e Entrega Contínua) automatiza o pipeline de entrega de software.' },
          { v: true,  exp: 'Monorepo armazena múltiplos projetos no mesmo repositório para compartilhamento de código.',
            texto: 'Monorepo é uma estratégia de versionamento onde múltiplos projetos coexistem no mesmo repositório.' },
          { v: false, exp: 'Microserviços são independentes; falha em um não necessariamente derruba os outros.',
            texto: 'Arquitetura de microserviços é sempre mais simples de operar do que monolitos.' },
          { v: true,  exp: 'Memoização armazena resultados de funções para evitar recompilação com os mesmos argumentos.',
            texto: 'Memoização é uma técnica de otimização que armazena resultados de chamadas de função.' },
          { v: true,  exp: 'Event sourcing armazena eventos em vez de estado atual, permitindo replay.',
            texto: 'Event sourcing registra todos os eventos que levaram ao estado atual do sistema.' },
          { v: false, exp: 'gRPC usa Protocol Buffers (binário) para comunicação mais eficiente que JSON/REST.',
            texto: 'gRPC é uma alternativa ao REST que usa JSON como formato principal de serialização.' },
          { v: true,  exp: 'Observabilidade combina métricas, logs e traces para entender sistemas distribuídos.',
            texto: 'Observabilidade vai além do monitoramento, combinando métricas, logs e rastreamento distribuído.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. IA E TECNOLOGIAS EMERGENTES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'ia',
    nome: 'IA e Tecnologias Emergentes',
    emoji: '🤖',
    cor: '#fbbf24',
    faixas: [
      {
        id: 'fund2',
        nome: '6º ao 9º Ano',
        emoji: '📗',
        tempo: 12,
        afirmacoes: [
          { v: true,  exp: 'IA simula capacidades humanas como aprender, raciocinar e resolver problemas.',
            texto: 'Inteligência Artificial é a capacidade de máquinas simularem comportamentos inteligentes.' },
          { v: false, exp: 'Chatbots respondem automaticamente, mas não possuem consciência ou sentimentos reais.',
            texto: 'Chatbots de IA têm consciência e sentimentos como os humanos.' },
          { v: true,  exp: 'Machine Learning permite que máquinas aprendam com dados sem serem explicitamente programadas.',
            texto: 'Machine Learning permite que computadores aprendam com dados sem programação explícita.' },
          { v: true,  exp: 'Assistentes de voz como Alexa e Siri usam processamento de linguagem natural.',
            texto: 'Assistentes de voz como Siri e Alexa utilizam Inteligência Artificial.' },
          { v: false, exp: 'Algoritmos de recomendação analisam padrões de comportamento para sugerir conteúdo.',
            texto: 'Plataformas como Netflix escolhem recomendações de forma completamente aleatória.' },
          { v: true,  exp: 'Deepfake usa IA para criar vídeos falsos realistas de pessoas.',
            texto: 'Deepfake é uma tecnologia que cria vídeos falsos altamente realistas usando IA.' },
          { v: true,  exp: 'Reconhecimento facial identifica pessoas analisando características do rosto.',
            texto: 'IA pode ser usada para reconhecer rostos em fotos e vídeos.' },
          { v: false, exp: 'Blockchain é um registro distribuído e imutável, não um banco central.',
            texto: 'Blockchain é um sistema controlado por um único banco central.' },
          { v: true,  exp: 'IoT conecta objetos físicos à internet para coletar e trocar dados.',
            texto: 'Internet das Coisas (IoT) conecta objetos do cotidiano à internet.' },
          { v: false, exp: 'Robôs industriais existem há décadas; IA torna alguns mais autônomos.',
            texto: 'Robôs com IA foram inventados apenas após 2020.' },
          { v: true,  exp: 'Carros autônomos usam câmeras, sensores e IA para navegar sem motorista.',
            texto: 'Veículos autônomos utilizam IA e sensores para se deslocar sem motorista.' },
          { v: true,  exp: 'IA generativa cria conteúdo novo como textos, imagens e músicas.',
            texto: 'IA generativa é capaz de criar textos, imagens, músicas e outros conteúdos.' },
          { v: false, exp: 'IA ainda não pode ser usada no diagnóstico médico por imagens.',
            texto: 'IA já é utilizada na área médica para auxiliar no diagnóstico por imagens.' },
          { v: true,  exp: 'Filtros de spam usam IA para identificar e bloquear e-mails indesejados.',
            texto: 'Filtros de spam em e-mails utilizam Inteligência Artificial.' },
          { v: false, exp: 'IA não tem nenhum impacto na música ou nas artes visuais.',
            texto: 'Ferramentas de IA já são amplamente usadas para gerar arte, música e conteúdo criativo.' },
        ],
      },
      {
        id: 'medio',
        nome: 'Ensino Médio',
        emoji: '📘',
        tempo: 14,
        afirmacoes: [
          { v: true,  exp: 'Redes neurais artificiais se inspiram na estrutura do cérebro humano.',
            texto: 'Redes neurais artificiais são modelos computacionais inspirados no cérebro humano.' },
          { v: false, exp: 'Deep Learning usa redes neurais profundas com múltiplas camadas ocultas.',
            texto: 'Deep Learning usa redes neurais rasas com apenas uma camada de processamento.' },
          { v: true,  exp: 'Supervised learning usa dados rotulados para treinar modelos preditivos.',
            texto: 'No aprendizado supervisionado, o modelo é treinado com dados rotulados.' },
          { v: true,  exp: 'NFT é um token não fungível que representa propriedade de ativos digitais únicos.',
            texto: 'NFTs (Non-Fungible Tokens) representam propriedade de itens digitais únicos na blockchain.' },
          { v: false, exp: 'Overfitting é quando o modelo memoriza os dados de treino e não generaliza.',
            texto: 'Overfitting indica que o modelo tem desempenho ruim nos dados de treinamento.' },
          { v: true,  exp: 'Realidade aumentada sobrepõe elementos digitais ao mundo físico em tempo real.',
            texto: 'Realidade aumentada (AR) combina elementos digitais com o ambiente físico real.' },
          { v: true,  exp: 'LLM (Large Language Model) é treinado em grandes volumes de texto para gerar linguagem.',
            texto: 'Modelos de linguagem de grande escala (LLMs) são a base de ferramentas como ChatGPT.' },
          { v: false, exp: 'Blockchain não pode ser facilmente alterada pois cada bloco referencia o anterior.',
            texto: 'Dados em uma blockchain podem ser facilmente alterados ou excluídos.' },
          { v: true,  exp: 'Transfer learning reutiliza conhecimento de um modelo pré-treinado para nova tarefa.',
            texto: 'Transfer learning permite aproveitar modelos pré-treinados para novas aplicações.' },
          { v: true,  exp: 'Metaverso é um ambiente virtual imersivo que integra elementos digitais e físicos.',
            texto: 'Metaverso é um conceito de ambiente digital imersivo e interconectado.' },
          { v: false, exp: 'Bias em IA são vieses do conjunto de dados que prejudicam a equidade do modelo.',
            texto: 'Viés (bias) em modelos de IA não tem impacto nos resultados práticos.' },
          { v: true,  exp: 'Computação quântica usa qubits que podem existir em superposição de estados.',
            texto: 'Computação quântica utiliza qubits que podem representar 0 e 1 simultaneamente.' },
          { v: true,  exp: 'IA pode perpetuar discriminações presentes nos dados históricos de treinamento.',
            texto: 'Modelos de IA podem reproduzir preconceitos presentes nos dados de treinamento.' },
          { v: false, exp: 'Edge computing processa dados próximos à fonte, reduzindo latência.',
            texto: 'Edge computing centraliza todo o processamento em servidores na nuvem.' },
          { v: true,  exp: 'Prompt engineering é a técnica de elaborar instruções eficientes para modelos de IA.',
            texto: 'Prompt engineering é uma técnica para obter melhores respostas de modelos de IA.' },
        ],
      },
      {
        id: 'tecnico',
        nome: 'Técnico / Superior',
        emoji: '📙',
        tempo: 16,
        afirmacoes: [
          { v: true,  exp: 'Transformer usa mecanismo de atenção (attention) para processar sequências.',
            texto: 'A arquitetura Transformer, base dos LLMs, usa mecanismo de self-attention.' },
          { v: false, exp: 'GAN tem gerador e discriminador competindo; VAE usa codificador-decodificador probabilístico.',
            texto: 'GANs e VAEs são arquiteturas equivalentes para geração de imagens.' },
          { v: true,  exp: 'RLHF alinha modelos de linguagem com preferências humanas via feedback.',
            texto: 'RLHF (Reinforcement Learning from Human Feedback) é usado para alinhar LLMs com preferências humanas.' },
          { v: true,  exp: 'Tokenização converte texto em unidades menores (tokens) para processamento pelo modelo.',
            texto: 'Tokenização é o processo de dividir texto em unidades processáveis pelos modelos de linguagem.' },
          { v: false, exp: 'RAG aumenta LLMs com recuperação de informações externas em tempo de inferência.',
            texto: 'RAG (Retrieval-Augmented Generation) substitui completamente o treinamento do modelo.' },
          { v: true,  exp: 'Gradient descent minimiza a função de perda ajustando os pesos do modelo iterativamente.',
            texto: 'Gradient descent é o algoritmo de otimização central no treinamento de redes neurais.' },
          { v: true,  exp: 'Quantização reduz a precisão dos pesos do modelo para menor uso de memória.',
            texto: 'Quantização de modelos reduz o tamanho e a latência de inferência com perda mínima.' },
          { v: false, exp: 'Fine-tuning ajusta um modelo pré-treinado para uma tarefa específica com menos dados.',
            texto: 'Fine-tuning requer treinamento do zero em novos dados para especializar o modelo.' },
          { v: true,  exp: 'Sharding distribui os pesos de um modelo muito grande entre múltiplas GPUs.',
            texto: 'Model sharding é necessário para treinar modelos maiores do que a memória de uma única GPU.' },
          { v: true,  exp: 'Embedding transforma dados (texto, imagem) em vetores numéricos densos.',
            texto: 'Embeddings representam dados como vetores em espaços de alta dimensão para processamento por IA.' },
          { v: false, exp: 'Redes neurais convolucionais (CNNs) são especializadas em processamento de imagens.',
            texto: 'Redes neurais convolucionais (CNNs) foram originalmente projetadas para processamento de áudio.' },
          { v: true,  exp: 'Explainable AI busca tornar decisões de modelos interpretáveis e auditáveis.',
            texto: 'XAI (Explainable AI) visa tornar o raciocínio dos modelos de IA mais transparente.' },
          { v: true,  exp: 'Computação quântica pode quebrar algoritmos de criptografia atuais como RSA.',
            texto: 'A computação quântica representa uma ameaça potencial aos algoritmos criptográficos atuais.' },
          { v: false, exp: 'MLOps aplica práticas de DevOps ao ciclo de vida de modelos de ML em produção.',
            texto: 'MLOps e DevOps são práticas completamente independentes sem sobreposição.' },
          { v: true,  exp: 'Federated learning treina modelos sem centralizar dados sensíveis.',
            texto: 'Federated learning permite treinar modelos de IA sem que os dados saiam dos dispositivos.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. OFFICE / FERRAMENTAS DIGITAIS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'office',
    nome: 'Office e Ferramentas Digitais',
    emoji: '📊',
    cor: '#34d399',
    faixas: [
      {
        id: 'fund2',
        nome: '6º ao 9º Ano',
        emoji: '📗',
        tempo: 12,
        afirmacoes: [
          { v: true,  exp: 'Word/Writer são processadores de texto para criar documentos formatados.',
            texto: 'O Microsoft Word e o Google Docs são processadores de texto.' },
          { v: false, exp: 'Excel usa células organizadas em linhas e colunas para dados e cálculos.',
            texto: 'O Excel é um software usado exclusivamente para criar apresentações de slides.' },
          { v: true,  exp: 'PowerPoint/Impress é usado para criar apresentações com slides.',
            texto: 'O PowerPoint é um programa para criar apresentações com slides.' },
          { v: true,  exp: 'Fórmulas em planilhas sempre começam com = para indicar um cálculo.',
            texto: 'Fórmulas em planilhas eletrônicas começam com o sinal de igual (=).' },
          { v: false, exp: 'E-mail é envio de mensagens; nuvem é armazenamento remoto de arquivos.',
            texto: 'Google Drive e Gmail são a mesma ferramenta com funções idênticas.' },
          { v: true,  exp: 'Ctrl+C copia e Ctrl+V cola o conteúdo selecionado.',
            texto: 'O atalho Ctrl+C copia e Ctrl+V cola conteúdo no computador.' },
          { v: true,  exp: 'PDF preserva a formatação do documento independente do sistema ou software.',
            texto: 'Arquivos PDF mantêm a formatação ao serem abertos em diferentes dispositivos.' },
          { v: false, exp: 'Pesquisa no Google indexa sites da web, não drive ou computador local.',
            texto: 'Pesquisar no Google mostra apenas arquivos salvos no próprio computador.' },
          { v: true,  exp: 'Videoconferência permite reuniões remotas com áudio e vídeo em tempo real.',
            texto: 'Ferramentas como Google Meet e Zoom permitem reuniões virtuais com vídeo.' },
          { v: false, exp: 'Ctrl+Z desfaz e Ctrl+Y refaz a última ação realizada.',
            texto: 'O atalho Ctrl+Z refaz a última ação realizada no documento.' },
          { v: true,  exp: 'Impressão em frente e verso usa menos papel e é mais sustentável.',
            texto: 'Imprimir nos dois lados da folha economiza papel.' },
          { v: true,  exp: 'Nuvem permite acessar arquivos de qualquer dispositivo com internet.',
            texto: 'Armazenar arquivos na nuvem permite acessá-los de qualquer lugar.' },
          { v: false, exp: 'Planilhas suportam gráficos, fórmulas, filtros e muitas outras funções.',
            texto: 'Planilhas eletrônicas só servem para fazer cálculos matemáticos simples.' },
          { v: true,  exp: 'Compartilhamento de documentos online permite edição simultânea por múltiplos usuários.',
            texto: 'Documentos no Google Docs podem ser editados por várias pessoas ao mesmo tempo.' },
          { v: false, exp: 'Spam são e-mails não solicitados, geralmente propagandas ou golpes.',
            texto: 'E-mails marcados como spam são sempre enviados por pessoas conhecidas.' },
        ],
      },
      {
        id: 'medio',
        nome: 'Ensino Médio',
        emoji: '📘',
        tempo: 14,
        afirmacoes: [
          { v: true,  exp: 'PROCV/VLOOKUP busca um valor em uma coluna e retorna um dado de outra coluna.',
            texto: 'A função PROCV no Excel busca um valor em uma tabela e retorna dados correspondentes.' },
          { v: false, exp: 'Tabela dinâmica resume e analisa grandes volumes de dados de forma interativa.',
            texto: 'Tabelas dinâmicas no Excel são usadas apenas para formatação visual de dados.' },
          { v: true,  exp: 'Markdown é uma linguagem de marcação leve para formatação de texto simples.',
            texto: 'Markdown é uma linguagem de marcação usada para formatar texto de forma simples.' },
          { v: true,  exp: 'Referência absoluta ($A$1) não muda ao copiar a fórmula para outras células.',
            texto: 'No Excel, o símbolo $ em referências de célula cria referências absolutas.' },
          { v: false, exp: 'SOMASE soma valores que atendem a um critério específico.',
            texto: 'A função SOMASE no Excel soma todos os valores de um intervalo sem condições.' },
          { v: true,  exp: 'Kanban organiza tarefas em colunas (A fazer, Em andamento, Concluído).',
            texto: 'Ferramentas como Trello usam o método Kanban para gerenciar tarefas.' },
          { v: true,  exp: 'Backup automático em nuvem protege contra perda de dados por falha local.',
            texto: 'Configurar backup automático na nuvem protege arquivos importantes contra perdas.' },
          { v: false, exp: 'HTTPS e SSL/TLS protegem dados transmitidos em serviços como Google e Office.',
            texto: 'Serviços de nuvem como Google Drive não utilizam criptografia para proteger os dados.' },
          { v: true,  exp: 'Macros automatizam tarefas repetitivas no Excel usando VBA ou gravação.',
            texto: 'Macros no Excel automatizam sequências de ações repetitivas.' },
          { v: true,  exp: 'Figma é uma ferramenta de design colaborativo para interfaces e protótipos.',
            texto: 'Figma é uma ferramenta de design de interfaces usada para prototipagem colaborativa.' },
          { v: false, exp: 'Controle de versão no Google Docs permite restaurar versões anteriores do documento.',
            texto: 'O Google Docs não salva versões anteriores dos documentos editados.' },
          { v: true,  exp: 'SEO otimiza sites para aparecer melhor nos resultados de buscadores.',
            texto: 'SEO (Search Engine Optimization) melhora o posicionamento de sites em buscadores.' },
          { v: true,  exp: 'Formulários do Google coletam respostas e organizam automaticamente em planilha.',
            texto: 'Google Forms coleta respostas que são automaticamente organizadas em planilhas.' },
          { v: false, exp: 'Notion, Obsidian e Roam são exemplos de ferramentas de anotação e PKM.',
            texto: 'Notion e Obsidian são exclusivamente ferramentas de gestão de projetos corporativos.' },
          { v: true,  exp: 'Automações como Zapier/Make conectam apps e automatizam fluxos sem código.',
            texto: 'Ferramentas no-code como Zapier permitem automatizar fluxos entre aplicativos sem programar.' },
        ],
      },
      {
        id: 'tecnico',
        nome: 'Técnico / Superior',
        emoji: '📙',
        tempo: 16,
        afirmacoes: [
          { v: true,  exp: 'Power Query transforma e modela dados antes de carregá-los no Excel ou Power BI.',
            texto: 'Power Query é uma ferramenta de ETL integrada ao Excel e Power BI.' },
          { v: false, exp: 'DAX é uma linguagem de fórmulas usada no Power BI para análise de dados.',
            texto: 'DAX (Data Analysis Expressions) é uma linguagem de programação para desenvolvimento web.' },
          { v: true,  exp: 'OLAP permite análise multidimensional de dados em cubos para BI.',
            texto: 'OLAP (Online Analytical Processing) suporta análise multidimensional de dados em BI.' },
          { v: true,  exp: 'APIs REST permitem integração entre diferentes plataformas e serviços.',
            texto: 'Integrações via API REST conectam diferentes sistemas e plataformas digitais.' },
          { v: false, exp: 'Power BI, Tableau e Looker são ferramentas de BI e visualização de dados.',
            texto: 'Power BI e Tableau são exclusivamente ferramentas de edição de planilhas avançadas.' },
          { v: true,  exp: 'ETL extrai, transforma e carrega dados de fontes diversas para análise.',
            texto: 'ETL (Extract, Transform, Load) é o processo de integração de dados de múltiplas fontes.' },
          { v: true,  exp: 'Jupyter Notebook combina código, saída e documentação em um único documento.',
            texto: 'Jupyter Notebook é amplamente usado em ciência de dados para análise exploratória.' },
          { v: false, exp: 'Governança de dados define políticas sobre qualidade, acesso e uso dos dados.',
            texto: 'Governança de dados se refere exclusivamente ao armazenamento físico dos servidores.' },
          { v: true,  exp: 'Data Lake armazena dados brutos em qualquer formato para análise futura.',
            texto: 'Data Lake armazena grandes volumes de dados brutos sem estrutura prévia definida.' },
          { v: true,  exp: 'Low-code/no-code democratiza o desenvolvimento de soluções digitais sem programação.',
            texto: 'Plataformas low-code/no-code permitem criar aplicações sem conhecimento profundo de programação.' },
          { v: false, exp: 'KPIs são métricas específicas e mensuráveis para avaliar desempenho organizacional.',
            texto: 'KPIs (Key Performance Indicators) são métricas subjetivas sem valores numéricos definidos.' },
          { v: true,  exp: 'Webhook envia dados automaticamente para outra aplicação quando um evento ocorre.',
            texto: 'Webhooks permitem que sistemas enviem notificações automáticas quando eventos ocorrem.' },
          { v: true,  exp: 'Storytelling com dados usa narrativa e visualizações para comunicar insights.',
            texto: 'Data storytelling combina dados e narrativa para comunicar insights de forma eficaz.' },
          { v: false, exp: 'Git não é adequado para ambientes corporativos de desenvolvimento profissional.',
            texto: 'Git é inadequado para gestão de código em equipes e projetos profissionais.' },
          { v: true,  exp: 'SaaS entrega software pela internet sob assinatura, sem instalação local.',
            texto: 'SaaS (Software as a Service) fornece software via internet sem necessidade de instalação local.' },
        ],
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ENGINE DO JOGO
// ═══════════════════════════════════════════════════════════════════════════════

let estado = {
  tema: null,
  faixa: null,
  afirmacoes: [],
  indice: 0,
  pontos: 0,
  vidas: 3,
  streak: 0,
  maxStreak: 0,
  acertos: 0,
  respondeuAtual: false,
  tempoRestante: 0,
  tempoTotal: 0,
  intervalo: null,
};

const FAIXA_IDS  = ['fund2', 'medio', 'tecnico'];
const FAIXA_NOMES = { fund2: '6º ao 9º Ano', medio: 'Ensino Médio', tecnico: 'Técnico / Superior' };
const FAIXA_EMOJIS = { fund2: '📗', medio: '📘', tecnico: '📙' };

function embaralhar(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ─────────────────────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────────────────────

export function render(container) {
  container.innerHTML = `
    <div class="jogo-area" id="qed-root">

      <div class="page-header">
        <span class="page-header__eyebrow">Quiz Acadêmico</span>
        <h1 class="page-header__titulo">🎓 Educação Digital — V ou F</h1>
        <p class="page-header__desc">
          6 temas · 3 níveis · 15 afirmações · timer · 3 vidas · streak.<br/>
          Escolha o tema e o nível para começar.
        </p>
      </div>

      <!-- ── SELEÇÃO DE TEMA ── -->
      <div id="qed-tela-tema">
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem;">
          ${TEMAS.map(t => `
            <div class="card qed-tema-card" data-tema="${t.id}" style="
              cursor:pointer; padding:1.4rem; border-color:${t.cor}33;
              transition:transform 0.15s, border-color 0.2s;">
              <div style="font-size:2rem; margin-bottom:0.6rem;">${t.emoji}</div>
              <div style="font-family:var(--font-display); font-weight:700; font-size:1rem;
                color:var(--text); margin-bottom:0.35rem;">${t.nome}</div>
              <div style="font-size:0.75rem; color:var(--text-3); font-family:var(--font-mono);">
                ${FAIXA_IDS.map(fid => {
                  const f = t.faixas.find(f => f.id === fid);
                  return f ? `${FAIXA_EMOJIS[fid]} ${FAIXA_NOMES[fid]}` : '';
                }).filter(Boolean).join(' · ')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ── SELEÇÃO DE FAIXA (aparece após escolher tema) ── -->
      <div id="qed-tela-faixa" style="display:none;">
        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.5rem; flex-wrap:wrap;">
          <button class="btn btn--ghost btn--sm" id="qed-btn-voltar-tema">← Temas</button>
          <span id="qed-tema-selecionado"
            style="font-family:var(--font-display); font-weight:700; font-size:1rem; color:var(--text);"></span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem;"
          id="qed-faixas-grid"></div>
      </div>

      <!-- ── TELA DO JOGO ── -->
      <div id="qed-tela-jogo" style="display:none; max-width:660px;">

        <!-- HUD -->
        <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap; margin-bottom:1.25rem;">
          <button class="btn btn--ghost btn--sm" id="qed-btn-sair-jogo">← Temas</button>
          <span id="qed-jogo-tag"
            style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-3);
            text-transform:uppercase; letter-spacing:0.08em;"></span>
          <span style="flex:1"></span>
          <span id="qed-vidas" style="font-size:1rem; letter-spacing:3px;"></span>
          <span id="qed-streak" style="font-family:var(--font-mono); font-size:0.8rem; color:var(--warning);"></span>
          <span id="qed-pontos" style="font-family:var(--font-mono); font-size:0.8rem; color:var(--primary);">⭐ 0</span>
        </div>

        <!-- Timer -->
        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem;">
          <div style="flex:1; background:var(--bg-2); border-radius:4px; height:7px;
            overflow:hidden; border:1px solid var(--border);">
            <div id="qed-timer-barra"
              style="height:100%; background:var(--primary); border-radius:4px; transition:width 1s linear;"></div>
          </div>
          <span id="qed-timer"
            style="font-family:var(--font-display); font-weight:800; font-size:1.3rem;
            color:var(--primary); min-width:2.2rem; text-align:right;"></span>
        </div>

        <!-- Questão -->
        <div class="card" id="qed-questao-card" style="
          padding:2rem; margin-bottom:1.25rem; text-align:center;
          min-height:170px; display:flex; flex-direction:column;
          align-items:center; justify-content:center; gap:0.75rem;">
          <div id="qed-numero"
            style="font-family:var(--font-mono); font-size:0.7rem; color:var(--primary);
            letter-spacing:0.1em; text-transform:uppercase;"></div>
          <p id="qed-afirmacao"
            style="font-size:1rem; font-weight:500; color:var(--text); line-height:1.7; margin:0;"></p>
        </div>

        <!-- Botões V / F -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <button id="qed-btn-v" style="
            padding:1.2rem; border-radius:12px; font-family:var(--font-display);
            font-weight:800; font-size:1.1rem; cursor:pointer;
            background:#22c55e18; border:2px solid #22c55e44; color:#4ade80;
            transition:background 0.15s, transform 0.12s;">✅ VERDADEIRO</button>
          <button id="qed-btn-f" style="
            padding:1.2rem; border-radius:12px; font-family:var(--font-display);
            font-weight:800; font-size:1.1rem; cursor:pointer;
            background:rgba(248,113,113,0.08); border:2px solid rgba(248,113,113,0.3);
            color:var(--danger); transition:background 0.15s, transform 0.12s;">❌ FALSO</button>
        </div>

        <!-- Feedback com explicação -->
        <div id="qed-feedback" style="display:none; padding:0.85rem 1rem; border-radius:10px;
          margin-bottom:1rem; font-size:0.88rem; line-height:1.6;"></div>
      </div>

      <!-- ── GAME OVER / VITÓRIA ── -->
      <div id="qed-tela-fim" style="display:none; max-width:500px; text-align:center; padding:2rem 0;">
        <div id="qed-fim-emoji" style="font-size:4rem; margin-bottom:1rem;"></div>
        <h2 id="qed-fim-titulo"
          style="font-family:var(--font-display); font-size:2rem; font-weight:800;
          color:var(--text); margin-bottom:0.5rem;"></h2>
        <p id="qed-fim-msg" style="color:var(--text-2); margin-bottom:2rem;"></p>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:0.75rem; margin-bottom:2rem;">
          <div class="card" style="padding:0.9rem; text-align:center;">
            <div id="qed-fim-pontos"
              style="font-family:var(--font-display); font-size:1.8rem; font-weight:800; color:var(--primary);"></div>
            <div style="font-size:0.68rem; color:var(--text-3); text-transform:uppercase;
              letter-spacing:0.05em; margin-top:0.2rem;">Pontos</div>
          </div>
          <div class="card" style="padding:0.9rem; text-align:center;">
            <div id="qed-fim-acertos"
              style="font-family:var(--font-display); font-size:1.8rem; font-weight:800; color:var(--success);"></div>
            <div style="font-size:0.68rem; color:var(--text-3); text-transform:uppercase;
              letter-spacing:0.05em; margin-top:0.2rem;">Acertos</div>
          </div>
          <div class="card" style="padding:0.9rem; text-align:center;">
            <div id="qed-fim-streak"
              style="font-family:var(--font-display); font-size:1.8rem; font-weight:800; color:var(--warning);"></div>
            <div style="font-size:0.68rem; color:var(--text-3); text-transform:uppercase;
              letter-spacing:0.05em; margin-top:0.2rem;">Max streak</div>
          </div>
        </div>
        <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap;">
          <button class="btn btn--primary" id="qed-btn-repetir">🔄 Repetir</button>
          <button class="btn btn--ghost" id="qed-btn-outro-nivel">📋 Outro Nível</button>
          <button class="btn btn--ghost" id="qed-btn-outro-tema">🔀 Outro Tema</button>
        </div>
      </div>

    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────

export function init(container) {
  // Clique nos cards de tema
  container.querySelectorAll('.qed-tema-card').forEach(card => {
    card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-2px)'; });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    card.addEventListener('click', () => {
      const tema = TEMAS.find(t => t.id === card.dataset.tema);
      mostrarFaixas(tema, container);
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SELEÇÃO DE FAIXA
// ─────────────────────────────────────────────────────────────────────────────

function mostrarFaixas(tema, container) {
  container.querySelector('#qed-tela-tema').style.display = 'none';
  const telaFaixa = container.querySelector('#qed-tela-faixa');
  telaFaixa.style.display = '';

  container.querySelector('#qed-tema-selecionado').textContent = `${tema.emoji} ${tema.nome}`;
  container.querySelector('#qed-btn-voltar-tema').onclick = () => {
    telaFaixa.style.display = 'none';
    container.querySelector('#qed-tela-tema').style.display = '';
  };

  const grid = container.querySelector('#qed-faixas-grid');
  grid.innerHTML = '';

  tema.faixas.forEach(faixa => {
    const btn = document.createElement('div');
    btn.className = 'card';
    btn.style.cssText = `cursor:pointer; padding:1.4rem; border-color:${tema.cor}33;
      transition:transform 0.15s, border-color 0.15s;`;
    btn.innerHTML = `
      <div style="font-size:2rem; margin-bottom:0.5rem;">${faixa.emoji} <span style="font-family:var(--font-mono); font-size:0.72rem; color:${tema.cor};">⏱ ${faixa.tempo}s</span></div>
      <div style="font-family:var(--font-display); font-weight:700; color:var(--text); margin-bottom:0.2rem;">${faixa.nome}</div>
      <div style="font-size:0.75rem; color:var(--text-3);">${faixa.afirmacoes.length} afirmações · 3 vidas</div>
    `;
    btn.addEventListener('mouseenter', () => { btn.style.transform = 'translateY(-2px)'; btn.style.borderColor = tema.cor + '66'; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; btn.style.borderColor = tema.cor + '33'; });
    btn.addEventListener('click', () => iniciarJogo(tema, faixa, container));
    grid.appendChild(btn);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// JOGO
// ─────────────────────────────────────────────────────────────────────────────

function iniciarJogo(tema, faixa, container) {
  if (estado.intervalo) clearInterval(estado.intervalo);

  estado = {
    tema,
    faixa,
    afirmacoes: embaralhar(faixa.afirmacoes),
    indice: 0,
    pontos: 0,
    vidas: 3,
    streak: 0,
    maxStreak: 0,
    acertos: 0,
    respondeuAtual: false,
    tempoRestante: faixa.tempo,
    tempoTotal: faixa.tempo,
    intervalo: null,
  };

  // Esconde outras telas
  ['#qed-tela-tema','#qed-tela-faixa','#qed-tela-fim'].forEach(s =>
    container.querySelector(s).style.display = 'none');
  container.querySelector('#qed-tela-jogo').style.display = '';

  container.querySelector('#qed-jogo-tag').textContent =
    `${tema.emoji} ${tema.nome} · ${faixa.emoji} ${faixa.nome}`;

  // Botão sair
  container.querySelector('#qed-btn-sair-jogo').onclick = () => {
    clearInterval(estado.intervalo);
    container.querySelector('#qed-tela-jogo').style.display = 'none';
    container.querySelector('#qed-tela-tema').style.display = '';
  };

  // Botões V / F
  const btnV = container.querySelector('#qed-btn-v');
  const btnF = container.querySelector('#qed-btn-f');
  btnV.onclick = () => { if (!estado.respondeuAtual) responder(true, container); };
  btnF.onclick = () => { if (!estado.respondeuAtual) responder(false, container); };

  // Hover
  [btnV, btnF].forEach(btn => {
    btn.addEventListener('mouseenter', () => { if (!estado.respondeuAtual) btn.style.transform = 'translateY(-2px)'; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // Teclado: V = verdadeiro, F = falso, ← → = verdadeiro / falso
  const keyRef = (e) => {
    if (estado.respondeuAtual) return;
    if (['v','V','ArrowRight'].includes(e.key)) responder(true, container);
    if (['f','F','ArrowLeft'].includes(e.key))  responder(false, container);
  };
  document.removeEventListener('keydown', container._qedKeyRef);
  container._qedKeyRef = keyRef;
  document.addEventListener('keydown', keyRef);

  mostrarAfirmacao(container);
}

function mostrarAfirmacao(container) {
  if (estado.indice >= estado.afirmacoes.length) {
    encerrar(container, true);
    return;
  }

  const af    = estado.afirmacoes[estado.indice];
  const total = estado.afirmacoes.length;

  container.querySelector('#qed-numero').textContent = `${estado.indice + 1} / ${total}`;
  container.querySelector('#qed-afirmacao').textContent = af.texto;
  container.querySelector('#qed-feedback').style.display = 'none';
  container.querySelector('#qed-vidas').textContent  = '❤️'.repeat(estado.vidas) + '🖤'.repeat(3 - estado.vidas);
  container.querySelector('#qed-streak').textContent = estado.streak >= 2 ? `🔥 ${estado.streak}x` : '';
  container.querySelector('#qed-pontos').textContent = `⭐ ${estado.pontos}`;

  estado.respondeuAtual  = false;
  estado.tempoRestante   = estado.faixa.tempo;
  atualizarBarra(container);

  clearInterval(estado.intervalo);
  estado.intervalo = setInterval(() => {
    estado.tempoRestante--;
    atualizarBarra(container);
    if (estado.tempoRestante <= 0) {
      clearInterval(estado.intervalo);
      if (!estado.respondeuAtual) responder(null, container); // timeout = erro
    }
  }, 1000);
}

function atualizarBarra(container) {
  const t   = estado.tempoRestante;
  const pct = (t / estado.faixa.tempo) * 100;
  const cor = t <= 3 ? 'var(--danger)' : t <= 6 ? 'var(--warning)' : 'var(--primary)';

  container.querySelector('#qed-timer').textContent = t;
  container.querySelector('#qed-timer').style.color = cor;
  const b = container.querySelector('#qed-timer-barra');
  b.style.width      = `${pct}%`;
  b.style.background = cor;
}

function responder(resposta, container) {
  clearInterval(estado.intervalo);
  estado.respondeuAtual = true;

  const af      = estado.afirmacoes[estado.indice];
  const correta = resposta === af.v;
  const timeout = resposta === null;

  const fb = container.querySelector('#qed-feedback');
  fb.style.display = '';

  if (correta) {
    estado.streak++;
    estado.maxStreak = Math.max(estado.maxStreak, estado.streak);
    const bonus = Math.min(estado.streak - 1, 5) * 2;
    estado.pontos += 10 + bonus;
    estado.acertos++;

    fb.style.cssText = `display:block; padding:0.85rem 1rem; border-radius:10px; margin-bottom:1rem;
      background:#22c55e18; border:1px solid #22c55e44; color:#4ade80; font-size:0.88rem; line-height:1.6;`;
    fb.innerHTML = `<strong>✅ Correto!${bonus > 0 ? ` +${bonus} bônus 🔥` : ''}</strong>
      ${af.exp ? `<br/><span style="color:var(--text-2); font-size:0.83rem;">💡 ${af.exp}</span>` : ''}`;
  } else {
    estado.streak = 0;
    estado.vidas--;

    fb.style.cssText = `display:block; padding:0.85rem 1rem; border-radius:10px; margin-bottom:1rem;
      background:rgba(248,113,113,0.08); border:1px solid rgba(248,113,113,0.3);
      color:var(--danger); font-size:0.88rem; line-height:1.6;`;
    fb.innerHTML = `<strong>${timeout ? '⏰ Tempo esgotado!' : '❌ Errado!'} Era ${af.v ? 'VERDADEIRO' : 'FALSO'}.</strong>
      ${af.exp ? `<br/><span style="color:var(--text-2); font-size:0.83rem;">💡 ${af.exp}</span>` : ''}`;
  }

  container.querySelector('#qed-vidas').textContent  = '❤️'.repeat(estado.vidas) + '🖤'.repeat(3 - estado.vidas);
  container.querySelector('#qed-streak').textContent = estado.streak >= 2 ? `🔥 ${estado.streak}x` : '';
  container.querySelector('#qed-pontos').textContent = `⭐ ${estado.pontos}`;

  if (estado.vidas <= 0) {
    setTimeout(() => encerrar(container, false), 900);
    return;
  }

  setTimeout(() => {
    estado.indice++;
    mostrarAfirmacao(container);
  }, correta ? 700 : 1200);
}

function encerrar(container, vitoria) {
  clearInterval(estado.intervalo);
  document.removeEventListener('keydown', container._qedKeyRef);

  container.querySelector('#qed-tela-jogo').style.display = 'none';
  const telaFim = container.querySelector('#qed-tela-fim');
  telaFim.style.display = '';

  const total = estado.afirmacoes.length;
  const pct   = Math.round((estado.acertos / total) * 100);

  let emoji, titulo, msg;
  if (vitoria && pct === 100) { emoji = '🏆'; titulo = 'Perfeito!'; msg = 'Nota máxima! Domínio completo do tema!'; }
  else if (vitoria && pct >= 80) { emoji = '🎉'; titulo = 'Excelente!'; msg = `Concluiu com ${pct}% de acertos!`; }
  else if (vitoria) { emoji = '✅'; titulo = 'Concluído!'; msg = `Terminou com ${pct}% de acertos. Pode melhorar!`; }
  else { emoji = '💀'; titulo = 'Game Over!'; msg = `Chegou na questão ${estado.indice + 1} de ${total}.`; }

  container.querySelector('#qed-fim-emoji').textContent  = emoji;
  container.querySelector('#qed-fim-titulo').textContent = titulo;
  container.querySelector('#qed-fim-msg').textContent    = msg;
  container.querySelector('#qed-fim-pontos').textContent  = estado.pontos;
  container.querySelector('#qed-fim-acertos').textContent = `${estado.acertos}/${total}`;
  container.querySelector('#qed-fim-streak').textContent  = estado.maxStreak;

  container.querySelector('#qed-btn-repetir').onclick = () =>
    iniciarJogo(estado.tema, estado.faixa, container);
  container.querySelector('#qed-btn-outro-nivel').onclick = () => {
    telaFim.style.display = 'none';
    mostrarFaixas(estado.tema, container);
  };
  container.querySelector('#qed-btn-outro-tema').onclick = () => {
    telaFim.style.display = 'none';
    container.querySelector('#qed-tela-tema').style.display = '';
  };
}
