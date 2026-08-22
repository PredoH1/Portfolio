// Script de migração único: sobe as imagens/arquivos atuais para o Cloudinary
// e popula o Firestore com o conteúdo hoje hardcoded no código.
//
// Como rodar (uma única vez, antes do primeiro deploy):
//   1. No Firebase Console: Configurações do projeto > Contas de serviço >
//      "Gerar nova chave privada" — salve o JSON como service-account.json
//      na raiz do projeto (NÃO commitar esse arquivo — já ignorado pelo .gitignore).
//   2. Preencha VITE_CLOUDINARY_CLOUD_NAME e VITE_CLOUDINARY_UPLOAD_PRESET no .env.
//   3. node scripts/seed-firestore.mjs
//
// Idempotência: NÃO é idempotente — rodar duas vezes duplica os documentos.
// É um script de uso único, não faz parte do app.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "dotenv/config";
import admin from "firebase-admin";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.error(
    "Defina VITE_CLOUDINARY_CLOUD_NAME e VITE_CLOUDINARY_UPLOAD_PRESET no .env antes de rodar."
  );
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(join(ROOT, "service-account.json")),
});
const db = admin.firestore();

async function uploadToCloudinary(relativePath) {
  const filePath = join(ROOT, relativePath);
  const buffer = readFileSync(filePath);
  const blob = new Blob([buffer]);

  const formData = new FormData();
  formData.append("file", blob, relativePath.split("/").pop());
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );
  if (!res.ok) {
    throw new Error(`Falha ao subir ${relativePath}: ${await res.text()}`);
  }
  const data = await res.json();
  return {
    url: data.secure_url,
    fileType: data.resource_type === "image" ? "image" : "pdf",
  };
}

async function seedProjects() {
  const projects = [
    {
      name: "Automação Risque",
      summary:
        "Sistema de impressão de etiquetas integrado ao SAP que automatiza o processo e reduz em 60% o tempo operacional na Logística Reversa.",
      description: [
        "Sistema de impressão de etiquetas (Risque e Biocolor) desenvolvido para substituir o processo anterior, que era manual, repetitivo e dependente de equipamentos adicionais. A nova solução automatiza a geração de dados diretamente do SAP, eliminando etapas como a leitura de código de barras.",
        "Com menos etapas e fluxo simplificado, o sistema reduziu em cerca de 60% o tempo do processo, aumentando a eficiência operacional na Logística Reversa da Coty.",
      ],
      imagePaths: ["src/images/AutoRisque.png"],
      techs: ["HTML", "CSS", "Javascript", "ZPL", "Excel", "VBS", "Python", "SAP"],
      github: "https://github.com/PredoH1/RisqueAutomac",
      demo: "",
      order: 0,
    },
    {
      name: "Torre de Controle - Reversa",
      summary:
        "Sistema que centraliza aplicações e dashboards da Logística Reversa em um único ambiente, funcionando como um hub operacional.",
      description: [
        "Projeto desenvolvido para centralizar sistemas e dashboards da área de Logística Reversa, criando um ambiente único para organização operacional e suporte à tomada de decisão. A solução funciona como um hub integrado, onde todos os relatórios e aplicações ficam disponíveis em um só lugar.",
        "Atualmente, é utilizado por 100% da equipe, com funcionamento automatizado e autonomia total para assistentes e analistas gerenciarem (criar, editar e excluir) aplicativos e relatórios da torre de controle.",
      ],
      imagePaths: ["src/images/torreControle.jpeg", "src/images/torreControle2.jpeg"],
      techs: ["HTML", "CSS", "Javascript", "Google Script", "Weather API", "Google Sheets"],
      github: "https://github.com/PredoH1/RisqueAutomac",
      demo: "",
      order: 1,
    },
    {
      name: "CACByPlannerPlay",
      summary:
        "Plataforma web para pequenos empreendedores com pouca familiaridade com tecnologia, eliminando o uso de papel na gestão do negócio.",
      description: [
        "Projeto universitário voltado ao desenvolvimento de uma plataforma web para pequenos empreendedores com pouca familiaridade com tecnologia, como pessoas idosas. A solução elimina o uso de papel e simplifica a gestão do negócio.",
      ],
      imagePaths: [
        "src/images/PlannerPlay1.png",
        "src/images/PlannerPlay2.png",
        "src/images/PlannerPlay3.png",
        "src/images/PlannerPlay4.png",
        "src/images/PlannerPlay5.png",
      ],
      techs: ["React", "Node.js", "Express", "MySql", "Apexcharts", "gsap", "swiper", "Cloud"],
      github: "https://github.com/PredoH1/CACByPlannerPlay",
      demo: "https://cacplannerplay.netlify.app",
      order: 2,
    },
    {
      name: "Aplicativo Suplementando",
      summary:
        "Aplicativo fitness que ajuda a comparar suplementos com base em critérios da ANVISA. Vice-campeão estadual na Liga Jovem do Sebrae.",
      description: [
        "Suplementando é um aplicativo fitness desenvolvido em colaboração com profissionais da área da saúde, voltado para qualquer pessoa que pratique esportes, musculação ou atividades físicas. O aplicativo permite que o usuário verifique se um suplemento é adequado para o seu dia a dia, consulte os ingredientes de cada suplemento, confira a nota do suplemento baseada nos critérios da ANVISA para uso no Brasil, compare diferentes suplementos e pesquise termos relacionados à nutrição esportiva e suplementação.",
        "O projeto está em fase de desenvolvimento e já conquistou reconhecimento estadual ao participar da competição Desafio Liga Jovem, destacando-se pelo planejamento, colaboração e impacto na comunidade fitness.",
      ],
      imagePaths: [
        "src/images/Suple1.png",
        "src/images/Suple2.png",
        "src/images/Suple3.png",
        "src/images/Suple4.png",
        "src/images/Suple5.png",
        "src/images/Suple6.png",
      ],
      techs: ["React Native", "Firebase", "Figma"],
      github: "https://github.com/PredoH1/SuplementandoApp",
      demo: "https://www.figma.com/design/07HNCCbl7a8HGcmLJ3mhvU/Design-App---Web---Suplementando?node-id=138-393&t=eSpmwrzg4CRcV4kG-0",
      order: 3,
    },
    {
      name: "Programa de Capacitação em Logística",
      summary:
        "Site de apoio ao aprendizado dos colaboradores da Coty, com conteúdos, exercícios e integração com Excel.",
      description: [
        "O Programa de Capacitação em Logística da empresa Coty tem como objetivo desenvolver competências essenciais e fortalecer a operação logística, promovendo integração entre os colaboradores e uma visão abrangente da gestão logística. Para apoiar os participantes, foi criado um site que permite revisar o conteúdo das aulas, realizar exercícios teóricos e práticos e praticar Excel diretamente na plataforma.",
        "Durante o desenvolvimento e manutenção da plataforma, atuei na criação de componentes interativos, como o carrossel de informativos em JavaScript, Footer e outros elementos, além de manter o site sempre atualizado com novas informações, eventos da empresa e conteúdos das aulas.",
      ],
      imagePaths: [
        "src/images/CapLogistica1.png",
        "src/images/CapLogistica2.png",
        "src/images/CapLogistica3.png",
        "src/images/CapLogistica4.png",
      ],
      techs: ["Google Sites", "HTML", "CSS", "Javascript", "Excel"],
      github: "",
      demo: "https://sites.google.com/view/capacitacaoemlogistica/fale-conosco?authuser=0",
      order: 4,
    },
    {
      name: "Automação SAP - Buscar e Filtrar Dados",
      summary:
        "Automação que extrai e filtra dados de depósitos no SAP, exportando-os automaticamente para o Excel.",
      description: [
        "Esta automação foi desenvolvida para a área de Logística Reversa da Coty, com o objetivo de extrair dados de depósitos diretamente do SAP e organizá-los automaticamente no Excel. Com apenas um clique, a automação insere o centro, o depósito e a variável de exibição, filtra apenas os materiais com quantidade maior que zero e exporta os dados já no layout correto para transferência entre depósitos.",
        "Antes da automação, essa tarefa precisava ser feita manualmente várias vezes ao dia. Com a implementação da solução, o processo se tornou mais rápido, preciso e eficiente.",
      ],
      imagePaths: ["src/images/AutoSAP1.png", "src/images/AutoSAP2.png"],
      techs: ["SAP", "VBA", "Excel"],
      github: "https://github.com/PredoH1/Automacao31005102/blob/main/Automacao31005102.xlsm",
      demo: "",
      order: 5,
    },
  ];

  for (const project of projects) {
    console.log(`Enviando imagens de "${project.name}"...`);
    const images = [];
    for (const path of project.imagePaths) {
      const { url } = await uploadToCloudinary(path);
      images.push(url);
    }
    const { imagePaths, ...rest } = project;
    await db.collection("projects").add({ ...rest, images });
    console.log(`  -> salvo no Firestore.`);
  }
}

async function seedExperiences() {
  const experiences = [
    {
      company: "COTY Brasil",
      role: "Assistente de Automação e BI",
      location: "Coty - Goiânia/Goias",
      date: "Nov 2025 - Present",
      details: [
        "Criação e acompanhamento de KPIs logísticos (Power BI)",
        "Tratamento e modelagem de dados (Power Query e DAX)",
        "Movimentação e extração de dados logísticos no SAP",
        "Desenvolvimento de aplicativos operacionais",
        "Manutenção e melhoria contínua de aplicações internas",
        "Automação de rotinas e processos (Power Automate, Python e Excel)",
        "Digitalização de processos manuais",
      ],
      order: 0,
    },
    {
      company: "COTY Brasil",
      role: "Jovem Profissional/ Estagiário",
      location: "Coty - Goiânia/Goias",
      date: "Jun 2024 - Nov 2025",
      details: [
        "Suporte ao time de Logística Reversa, utilizando SAP (transações MIGO, MB52, LS26, LS22, LT06, LT12, MB51, ZPP195, ZMM077) para movimentações entre estoques, análise e acompanhamento de processos.",
        "Manipulação e análise de dados via Excel, com foco em filtragem, listagem e consolidação de informações.",
        "Desenvolvimento de automação de processos com VBA, PowerApps e Power Automate, Python, SAP e Excel",
        "Apoio direto a assistentes e analistas em demandas operacionais e projetos de melhoria contínua",
      ],
      order: 1,
    },
    {
      company: "Projeto Universitário - Faculdade Unialfa",
      role: "Desenvolvedor Full Stack (Projeto Acadêmico)",
      location: "Goiânia/Goias",
      date: "Jan 2025 - Jun 2025",
      details: [
        "Desenvolvimento de uma plataforma web voltada para pequenos empreendedores com baixa familiaridade com tecnologia, como idosos. A solução elimina o uso de papel e facilita a gestão do negócio. A primeira funcionalidade implementada foi o cálculo do CAC (Custo de Aquisição de Clientes), com uma interface simples e intuitiva",
        "Tecnologias: React, JavaScript, Node.js, Express, MySQL, ApexCharts, GSAP, HTML, CSS. Backend e banco de dados hospedados na nuvem.",
      ],
      order: 2,
    },
    {
      company: "Suplementando – Liga Jovem do Sebrae",
      role: "Desenvolvedor Mobile",
      location: "Goiânia/Goias",
      date: "Jun 2025 - Present",
      details: [
        "Competindo na fase estadual, projeto em desenvolvimento.",
        "Aplicativo para fornecer informações confiáveis sobre nutrição suplementar, com dados baseados na ANVISA (nota de confiabilidade, ingredientes e benefícios).",
        "Responsável pelo desenvolvimento e design da interface, utilizando React Native e Firebase.",
      ],
      order: 3,
    },
  ];

  for (const exp of experiences) {
    await db.collection("experiences").add(exp);
  }
  console.log(`Experiências: ${experiences.length} salvas.`);
}

async function seedActivities() {
  const activities = [
    {
      title: "Time Reversa",
      description: "Apresentação das melhorias da Logística Reversa",
      imagePath: "src/images/timeReversa.jpeg",
      tag: "Trabalho",
      date: "Abril 2026",
      order: 0,
    },
    {
      title: "Apresentação das Melhorias Coty 2026",
      description: "Apresentei as melhorias para a área de Logística Reversa",
      imagePath: "src/images/apresentacaoMelhorias.jpeg",
      tag: "Trabalho",
      date: "Abril 2026",
      order: 1,
    },
    {
      title: "Projeto Suplementando",
      description:
        "Apresentação do projeto Suplementando, classificado para a etapa nacional após conquistar a vitória na fase estadual do desafio Liga Jovem.",
      imagePath: "src/images/projetoSuple.JPG",
      tag: "Competição",
      date: "Outubro 2025",
      order: 2,
    },
    {
      title: "Automação de Etiquetas na Coty",
      description:
        "Implementação do sistema de impressão ZPL integrado ao SAP, reduzindo em 60% o tempo operacional da equipe de logística reversa.",
      imagePath: "src/images/AutoRisque.png",
      tag: "Trabalho",
      date: "Abril 2026",
      order: 3,
    },
  ];

  for (const activity of activities) {
    console.log(`Enviando imagem de "${activity.title}"...`);
    const { url } = await uploadToCloudinary(activity.imagePath);
    const { imagePath, ...rest } = activity;
    await db.collection("activities").add({ ...rest, image: url });
  }
  console.log(`Atividades: ${activities.length} salvas.`);
}

async function seedResume() {
  const techIcons = [
    { name: "Power BI", path: "src/assets/powerBi.png" },
    { name: "HTML", path: "src/assets/html.png" },
    { name: "CSS", path: "src/assets/css.png" },
    { name: "Excel", path: "src/assets/excel.png" },
    { name: "Google Sites", path: "src/assets/googleSites.png" },
    { name: "JavaScript", path: "src/assets/javascript.png" },
    { name: "MongoDB", path: "src/assets/mongoDb.png" },
    { name: "MySQL", path: "src/assets/mySql.png" },
    { name: "Next.js", path: "src/assets/next.png" },
    { name: "Node.js", path: "src/assets/node.png" },
    { name: "PowerApps", path: "src/assets/powerapps.png" },
    { name: "SAP", path: "src/assets/sap.png" },
    { name: "React", path: "src/assets/react.png" },
    { name: "VBA", path: "src/assets/vba.png" },
  ];

  for (let i = 0; i < techIcons.length; i++) {
    const { url } = await uploadToCloudinary(techIcons[i].path);
    await db
      .collection("techIcons")
      .add({ name: techIcons[i].name, iconUrl: url, order: i });
  }
  console.log(`Tech icons: ${techIcons.length} salvos.`);

  const certificates = [
    { name: "Excel Avançado", path: "src/files/Certificado1.pdf" },
    { name: "Desenvolvimento Web", path: "src/files/Certificado2.png" },
    { name: "CiberSegurança", path: "src/files/Certificado3.png" },
    { name: "Inglês", path: "src/files/Certificado4.pdf" },
    { name: "Banco de Dados", path: "src/files/Certificado5.pdf" },
  ];

  for (let i = 0; i < certificates.length; i++) {
    const { url, fileType } = await uploadToCloudinary(certificates[i].path);
    await db.collection("certificates").add({
      name: certificates[i].name,
      fileUrl: url,
      fileType,
      order: i,
    });
  }
  console.log(`Certificados: ${certificates.length} salvos.`);
}

async function seedProfile() {
  await db
    .collection("settings")
    .doc("profile")
    .set({
      bio: "Sou Pedro Henrique Souza Candido, graduando em Sistemas de Informação e Assistente de Automação e BI na Coty. Atuo na integração entre Logística e Tecnologia, desenvolvendo soluções que automatizam processos e geram valor para o negócio. Trabalho com Power BI (DAX/Power Query), PowerApps e automações que conectam Python, SAP e o ecossistema Power Platform. Também atuo como desenvolvedor freelancer, criando aplicações web e mobile sob medida. Tenho experiência em Banco de Dados, desenvolvimento com React/Next.js e automação empresarial, sempre focado em eficiência, escalabilidade e resultados.",
      servicesOffered: [
        "Criação de Landing Pages profissionais para empresas e empreendedores;",
        "Desenvolvimento de sistemas de gestão sob medida;",
        "Integração de bancos de dados e APIs;",
        "Aplicativos Web e Mobile completos;",
        "Automação de planilhas e macros VBA;",
        "Desenvolvimento full stack (front-end e back-end);",
        "Suporte vitalício após a entrega do projeto.",
      ],
      socialLinks: { instagram: "", github: "", linkedin: "", whatsapp: "" },
    });
  console.log("Perfil salvo (edite os links sociais pelo painel /painel-x7k9).");
}

async function main() {
  await seedProjects();
  await seedExperiences();
  await seedActivities();
  await seedResume();
  await seedProfile();
  console.log("Seed concluído.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
